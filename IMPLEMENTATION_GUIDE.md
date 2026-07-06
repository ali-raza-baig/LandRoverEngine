# LandRoverEngine.uk Diagnostic Calculator — Implementation Guide

## File Structure

```
/data/costTable.js              ← COST_TABLE (17 failure types) + CHASSIS_REFERENCE + STATIC_TABLE_ROWS
/data/diagnosticTree.js         ← Q1_OPTIONS, DIAGNOSTIC_TREE (PATH A–E), resolveDiagnosis()
/data/market-intelligence.json  ← monthly-refreshable enquiry/model/regional data
/utils/verdictLogic.js          ← getVerdict(), VERDICT_CONFIG, getScrapNote(), FALLBACK_MESSAGE, fmt()
/LandRoverDiagnosticCalculator.jsx ← main component (default export) + StaticCostTable (named export)
```

This mirrors the BMWEngines.uk calculator's architecture exactly, so both can share a build pipeline and a developer only has to learn the pattern once.

## How the flow works

1. **Q1** — user picks a failure category (Unusual Noises, Ride Height & 4x4 Issues, Fluid Leaks/Smells/Smoke, Dashboard/Electrical/Water Ingress, Loss of Power) — PATH A–E from the spec. **Above** the category cards sits a "Know your exact fault?" shortcut grid (spec Part 7's Top-15 list) — clicking one of these jumps straight past Q2 to the vehicle step, for owners who already know exactly what's wrong.
2. **Q2** — user picks the specific symptom within that category. `resolveDiagnosis(q1, answerId)` maps the pair to one of the 17 `COST_TABLE` keys.
3. **Override** — if the resolved diagnosis has `severity: "catastrophic"` or `"immediate"`, the wizard shows a red (catastrophic) or orange (immediate) safety screen before continuing, using that diagnosis's specific `overrideCopy` (see below) rather than generic text. The user must click through ("I understand — see cost estimate") to proceed.
4. **Vehicle** — age pills + value slider.
5. **Replacement type** — reconditioned / rebuilt / used.
6. **Results** — `getVerdict()` runs the ABCD matrix and renders the verdict badge, a **chassis-mapping panel** (new vs. the BMW build — see below), the cost breakdown, OEM parts, `[EM-VERIFIED]` / `[EM-QUOTE]` badges, a severity badge, the dynamic scrap note (verdict D only), and the dual CTA.

If a user hits "None of these match" on Q2, `diagnosisKey` resolves to `"unknown"` and the fallback banner (`FALLBACK_MESSAGE`) displays on the vehicle step — the calculator still completes normally using the `unknown` cost tier.

## What's different from the BMW build

**Chassis-code mapping (spec Part 4.4 / 9.4).** LR/RR owners search by chassis code (L405, L494, L320…) far more than BMW owners search by engine code. Every `COST_TABLE` entry carries a `chassis` array, and the results screen expands known codes into a friendly label via `CHASSIS_REFERENCE` (sourced from spec Part 16): *"Range Rover Sport L320 · 2005–2013"* rather than a bare code.

**Two-tier override screen (spec Part 17).** The BMW build used a single red screen for both `catastrophic` and `immediate` severities. This build follows the spec's four-tier severity system properly: catastrophic is red ("DO NOT DRIVE"), immediate is orange ("ARRANGE RECOVERY"). A small `SeverityBadge` (🔴/🟠/🟡/🟢) also appears next to the diagnosis label on the results screen.

**Per-diagnosis override copy.** The spec gives six genuinely different warnings — "DO NOT ATTEMPT TO RAISE — FIRE RISK" for the EAS compressor is not interchangeable with "STOP DRIVING — COOLANT INGESTION RISK" for the V8 oil cooler. Each of the six catastrophic/immediate entries carries its own `overrideCopy: { headline, body, actions }` in `costTable.js`, rather than one generic message.

**"Known fault" shortcut grid.** Spec Part 7 lists a Top-15 dropdown that the Part 4 wizard flow doesn't otherwise use. Rather than picking one interpretation and dropping the other, both are implemented: the guided Q1→Q2 path is primary, and the shortcut grid sits above it as a fast lane. 14 of the 15 spec items are included — see the data-gap note below for the one that was left out.

## Data provenance — what's [EM-VERIFIED] vs. estimate

Of the 17 failure types, five map directly to a JLR engine code with real 2025 enquiry data in `EM_Proprietary_Data_2025.txt` and are flagged `emVerified: true`:

- Ingenium Timing Chain (204DTD — 1,150 enquiries)
- TDV6/SDV6 Crankshaft (306DT — 980 enquiries)
- TDV8 Timing Chain (368DT — 650 enquiries)
- 4.4 V8 Oil Cooler (508PS — 620 enquiries)
- Duratorq Injector Seal (224DT — 350 enquiries)

The remaining twelve (transfer case, ZF 8HP, air suspension leak, EAS compressor, EAS height sensor, Ingenium EGR cooler, turbo actuator, DPF/swirl flap, water ingress, parasitic drain, HPFP, oil dilution) are ancillary/system faults that sit outside EM's engine-code enquiry data — they carry `emVerified: false` and use the repair/replacement figures given directly in the diagnostic-tree specification, not invented numbers.

## OEM part number caveat — please read before publishing

The source specification reused the same three placeholder-looking part numbers ("LR012345", "LR012346", "LR012347") across several **unrelated** components: the turbo actuator, the DPF pressure sensor, the sunroof drain tube, the BMS sensor, the HPFP, the injector, and the fuel rail all appeared with one of these three numbers in the source document. A single part number cannot genuinely apply to a turbocharger and a sunroof drain tube, so publishing them as-is would put incorrect part numbers in front of a specialist trying to source a repair — a real EEAT and trust risk for exactly the kind of technical-authority page this calculator is meant to build.

Per the spec's own governance instruction (Part 9.2: *"Where uncertainty exists, mark the part as [CONFIRM WITH SPECIALIST]"*), those placeholder numbers have been replaced with **"Confirm with specialist"** in `costTable.js` rather than presented as verified. Six entries are affected: `turboActuator`, `dpfSwirlFlap` (2 of 3 parts), `waterIngress`, `parasiticDrain`, `hpfpFailure`, `oilDilution`. Every other part number (the eleven entries with distinct-looking LR/ZF/Ford-style part numbers) is reproduced exactly as given in the spec.

**Recommended next step:** before this ships, run these six components' real part numbers through JLR's EPIC system or your parts supplier, and swap the placeholders for confirmed numbers.

## Data gap — one shortcut item omitted

Spec Part 7, item 10, "Plastic Coolant Pipes / Expansion Tank Bursting," has no cost range, no OEM part numbers, and no matching diagnosis anywhere in the Part 2 decision trees. Rather than inventing pricing for it, it's been left out of the shortcut grid and out of `COST_TABLE`. If you want this added, it needs a real cost range and part numbers first — flag it for your next data-collection pass.

## Two diagnosis keys the shortcut grid maps to a single "worse case"

- Item 3 ("EAS Compressor / Air Leak Failure") is mapped to `easCompressor` (catastrophic/fire-risk), not the lower-severity `airSuspensionLeak`, on the reasoning that a one-click shortcut should default to the more serious read rather than under-warn a genuine compressor failure. Owners with just a slow leak will self-correct via the guided B1 path.
- Item 9 ("EGR Cooler & Oil Dilution Failure") is mapped to `ingeniumEgrCooler` (catastrophic/fire-risk) rather than the lower-severity `oilDilution`, for the same reason.

Both are documented here so this editorial call is visible and reversible, not buried in the data.

## Integrating into the LandRoverEngine.uk homepage

```jsx
import LandRoverDiagnosticCalculator, { StaticCostTable } from "./LandRoverDiagnosticCalculator";

// Full experience (wizard + table):
<LandRoverDiagnosticCalculator />

// Table only, e.g. for a lighter-weight page or a different section:
<StaticCostTable />
```

## Answers to the standard three questions

**1. Expected load time / lazy loading?**
Same answer as the BMW build: no runtime API calls, all data is static JS/JSON bundled at build time. Lazy-load with `next/dynamic` since it sits below the fold:

```jsx
import dynamic from "next/dynamic";
const LandRoverDiagnosticCalculator = dynamic(() => import("../components/LandRoverDiagnosticCalculator"), {
  loading: () => <div style={{ minHeight: 600 }} />,
});
```

**2. How to refresh "Updated Monthly" data without a full deployment?**
`market-intelligence.json` is separated from component code for this reason. For monthly-cadence data, the simple file-in-repo approach (content team edits the JSON, ships on next deploy) is proportionate; move to a CMS singleton or published Google Sheet only if your content team specifically wants no-code editing.

**3. SSR or SSG for the static table?**
**SSG.** Cost data changes quarterly per the maintenance schedule, not per-request. Use `getStaticProps` with `revalidate: 2592000` (30 days), or build it at deploy time if fully static.

## Testing checklist

- [ ] 375px (mobile) — shortcut grid and diagnostic cards fall to a 2-column layout, condition buttons stack vertically, all buttons ≥44px min-height
- [ ] 768px (tablet) — 3-column Q1 grid and 4-column shortcut grid remain legible
- [ ] 1024px+ (desktop) — full layout as designed
- [ ] Catastrophic override — red screen (test via Path A → A2, TDV6 crankshaft) blocks progression until acknowledged
- [ ] Immediate override — orange screen (test via Path A → A5, TDV8 timing chain) shows the correct, distinct colour and copy
- [ ] Fire-risk override — test via Path B → B2 (EAS compressor) and Path C → C3 (Ingenium EGR cooler); both should show 🔥 and "fire risk" language
- [ ] Chassis mapping panel renders correctly for both known codes (e.g. L320 → "Range Rover Sport L320 · 2005–2013") and free-text entries (e.g. "All JLR diesel models")
- [ ] Known-fault shortcut grid — clicking a catastrophic/immediate shortcut (e.g. TDV6 crankshaft) routes through the override screen, not straight to vehicle step
- [ ] Fallback path ("None of these match" on any Q2 screen) shows the warning banner and still completes
- [ ] Verdict D with vehicle age "over15" and value below threshold shows the scrap-value note
- [ ] Verdict C triggers correctly for a high-value vehicle (>£12,000) with one of the three qualifying catastrophic diagnoses (TDV6 crankshaft, SDV8 oil cooler, TDV8 timing chain)
- [ ] Both CTA buttons resolve to the exact URLs specified: `enginesmarket.co.uk/get-a-quote` and `enginefinders.co.uk/get-quotes`
- [ ] OEM parts marked "Confirm with specialist" display correctly and don't look like broken data
