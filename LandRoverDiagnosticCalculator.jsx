'use client'
import { useState } from "react";
import { COST_TABLE, CHASSIS_REFERENCE, STATIC_TABLE_ROWS } from "./data/costTable";
import { Q1_OPTIONS, DIAGNOSTIC_TREE, resolveDiagnosis } from "./data/diagnosticTree";
import { getVerdict, VERDICT_CONFIG, FALLBACK_MESSAGE, fmt } from "./utils/verdictLogic";

// ─── LEAD FORM DESTINATIONS ────────────────────────────────────────────────
const QUOTE_URL = "https://enginesmarket.co.uk/get-a-quote";
const SPECIALIST_URL = "https://enginefinders.co.uk/get-quotes";

const CAR_AGES = [
  { id: "under5", label: "Under 5 years" },
  { id: "5to10", label: "5–10 years" },
  { id: "10to15", label: "10–15 years" },
  { id: "over15", label: "Over 15 years" },
];

const VALUE_STEPS = [500, 1000, 2500, 5000, 10000, 15000, 20000];
const ENGINE_CONDITIONS = [
  { id: "reconditioned", label: "Reconditioned", from: "From £1,800 S&F" },
  { id: "rebuilt", label: "Rebuilt", from: "From £1,200 S&F" },
  { id: "used", label: "Used", from: "From £850 S&F" },
];

// Top-15 "Know your exact fault?" shortcut (spec Part 7). Skips straight
// past Q1/Q2 to the vehicle step. One spec item — "Plastic Coolant Pipes /
// Expansion Tank Bursting" — is omitted here: the source spec gives it no
// cost or OEM part data, and per the "no invented data" requirement it
// isn't included until real figures exist. See IMPLEMENTATION_GUIDE.md.
const KNOWN_FAULT_SHORTCUTS = [
  { icon: "💥", diagnosisKey: "tdv6Crankshaft" },
  { icon: "⛓️", diagnosisKey: "ingeniumTimingChain" },
  { icon: "🚙", diagnosisKey: "easCompressor" },
  { icon: "⚙️", diagnosisKey: "transferCase" },
  { icon: "🔧", diagnosisKey: "tdv8TimingChain" },
  { icon: "🔄", diagnosisKey: "zf8hp" },
  { icon: "🧊", diagnosisKey: "sdv8OilCooler" },
  { icon: "💀", diagnosisKey: "duratorqInjector" },
  { icon: "🔥", diagnosisKey: "ingeniumEgrCooler" },
  { icon: "🌀", diagnosisKey: "dpfSwirlFlap" },
  { icon: "☔", diagnosisKey: "waterIngress" },
  { icon: "💨", diagnosisKey: "turboActuator" },
  { icon: "🔋", diagnosisKey: "parasiticDrain" },
];

const SEVERITY_META = {
  catastrophic: { icon: "🔴", label: "Catastrophic", color: "#dc2626" },
  immediate: { icon: "🟠", label: "Immediate", color: "#ea580c" },
  monitor: { icon: "🟡", label: "Monitor", color: "#b45309" },
  low: { icon: "🟢", label: "Low Risk", color: "#15803d" },
};

const C = {
  navy: "#0d1b2e",
  green: "#D4AF37",
  greenBright: "#22c55e",
  white: "#ffffff",
  muted: "#94a3b8",
  border: "#e2e8f0",
  textDark: "#0d1b2e",
  textMid: "#4b5563",
  bgCard: "#f8fafc",
  red: "#dc2626",
  orange: "#ea580c",
};

// ─── SMALL SHARED PIECES ───────────────────────────────────────────────────

function EMBadge({ children = "EM-VERIFIED" }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        background: "#dcfce7",
        color: C.green,
        fontFamily: "'Lato', sans-serif",
        fontSize: "10px",
        fontWeight: 800,
        letterSpacing: "0.06em",
        padding: "2px 8px",
        borderRadius: "100px",
        border: "1px solid #86efac",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      ● {children}
    </span>
  );
}

function SeverityBadge({ severity }) {
  const m = SEVERITY_META[severity] || SEVERITY_META.monitor;
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        background: "#fff",
        border: `1px solid ${m.color}`,
        color: m.color,
        fontFamily: "'Lato', sans-serif",
        fontSize: "10.5px",
        fontWeight: 800,
        letterSpacing: "0.05em",
        padding: "3px 10px",
        borderRadius: "100px",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
      }}
    >
      {m.icon} {m.label}
    </span>
  );
}

function ProgressBar({ percent }) {
  return (
    <div style={{ height: "3px", background: C.border, borderRadius: "3px 3px 0 0", overflow: "hidden" }}>
      <div style={{ height: "100%", background: C.green, width: `${percent}%`, transition: "width 0.4s ease" }} />
    </div>
  );
}

function StepIndicator({ stage }) {
  const steps = ["Symptom", "Your Vehicle", "Replacement Type"];
  return (
    <div style={{ display: "flex", alignItems: "center", marginBottom: "28px" }}>
      {steps.map((label, i) => {
        const num = i + 1;
        const active = stage === num;
        const done = stage > num;
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : "unset" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: done || active ? C.green : "transparent",
                  border: `2px solid ${done || active ? C.green : C.border}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "13px",
                  fontWeight: 800,
                  color: done || active ? C.white : C.muted,
                  fontFamily: "'Barlow Condensed', sans-serif",
                }}
              >
                {done ? "✓" : num}
              </div>
              <span
                style={{
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "10px",
                  fontWeight: 700,
                  color: active || done ? C.green : C.muted,
                  letterSpacing: "0.07em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
              >
                {label}
              </span>
            </div>
            {i < 2 && (
              <div
                style={{
                  flex: 1,
                  height: "2px",
                  margin: "0 10px",
                  marginBottom: "22px",
                  background: stage > i + 1 ? C.green : C.border,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── CATASTROPHIC / IMMEDIATE OVERRIDE SCREEN ──────────────────────────────

function OverrideScreen({ entry, onContinue }) {
  const isCatastrophic = entry.severity === "catastrophic";
  const accent = isCatastrophic ? C.red : C.orange;
  const bg = isCatastrophic ? "#fef2f2" : "#fff7ed";

  const copy = entry.overrideCopy || {
    headline: isCatastrophic ? "DO NOT DRIVE THIS VEHICLE" : "ARRANGE RECOVERY — DO NOT CONTINUE DRIVING",
    body: isCatastrophic
      ? "The diagnosis indicates a catastrophic failure that could cause further, irreversible damage if the vehicle is driven."
      : "The diagnosis indicates a fault that could leave you stranded or cause further damage if driving continues.",
    actions: [
      "Do not start the engine again if it will not start naturally.",
      "Arrange vehicle recovery rather than driving further.",
      "Contact a JLR specialist for a full inspection before any repair decision.",
    ],
  };

  return (
    <div style={{ backgroundColor: bg, border: `2px solid ${accent}`, borderRadius: "12px", padding: "24px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
        <span style={{ fontSize: "32px" }}>{entry.fireRisk ? "🔥" : "⚠️"}</span>
        <h3
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "22px",
            color: accent,
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          {copy.headline}
        </h3>
      </div>
      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "15px", color: "#4b5563", marginBottom: "12px", lineHeight: 1.6 }}>
        {copy.body}
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px 0" }}>
        {copy.actions.map((t, i) => (
          <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginBottom: "8px" }}>
            <span>✅</span>
            <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: "#4b5563", lineHeight: 1.5 }}>{t}</span>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
        <a
          href={SPECIALIST_URL}
          style={{
            flex: "1 1 200px",
            minHeight: "48px",
            background: accent,
            color: "#fff",
            padding: "12px",
            borderRadius: "8px",
            textAlign: "center",
            fontFamily: "'Lato', sans-serif",
            fontWeight: 800,
            fontSize: "14px",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Find a JLR Specialist →
        </a>
        <button
          onClick={onContinue}
          style={{
            flex: "1 1 200px",
            minHeight: "48px",
            background: "transparent",
            color: accent,
            border: `1.5px solid ${accent}`,
            padding: "12px",
            borderRadius: "8px",
            fontFamily: "'Lato', sans-serif",
            fontWeight: 700,
            fontSize: "14px",
            cursor: "pointer",
          }}
        >
          I understand — see cost estimate →
        </button>
      </div>
    </div>
  );
}

// ─── CHASSIS MAPPING ────────────────────────────────────────────────────────

function ChassisMapping({ chassis }) {
  if (!chassis || chassis.length === 0) return null;
  const known = chassis.filter((c) => CHASSIS_REFERENCE[c]);
  const freeText = chassis.filter((c) => !CHASSIS_REFERENCE[c]);

  return (
    <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "10px", padding: "14px 18px", marginBottom: "16px" }}>
      <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", fontWeight: 700, color: "#15803d", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px" }}>
        Commonly Affecting
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {known.map((code) => (
          <span
            key={code}
            style={{
              background: "#fff",
              border: "1px solid #86efac",
              borderRadius: "8px",
              padding: "6px 10px",
              fontFamily: "'Lato', sans-serif",
              fontSize: "12.5px",
              color: C.textDark,
            }}
          >
            <strong>{CHASSIS_REFERENCE[code].model}</strong> {code}
            <span style={{ color: C.muted }}> · {CHASSIS_REFERENCE[code].years}</span>
          </span>
        ))}
        {freeText.map((label) => (
          <span
            key={label}
            style={{
              background: "#fff",
              border: "1px solid #86efac",
              borderRadius: "8px",
              padding: "6px 10px",
              fontFamily: "'Lato', sans-serif",
              fontSize: "12.5px",
              color: C.textDark,
            }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── RESULTS / VERDICT SCREEN ──────────────────────────────────────────────

function VerdictScreen({ diagnosisKey, carAge, carValue, engineCondition, onReset }) {
  const { verdict, entry, costs, pct, saving, scrapNote } = getVerdict(diagnosisKey, carAge, carValue, engineCondition);
  const vc = VERDICT_CONFIG[verdict];
  const condLabel = ENGINE_CONDITIONS.find((c) => c.id === engineCondition)?.label;
  const oemEntries = Object.entries(entry.oemParts || {});

  return (
    <div>
      {/* Verdict badge */}
      <div style={{ background: vc.bg, border: `1.5px solid ${vc.border}`, borderRadius: "12px", padding: "20px 24px", marginBottom: "20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
          <span style={{ fontSize: "28px", lineHeight: 1 }}>{vc.emoji}</span>
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "21px", color: C.textDark, lineHeight: 1.2, marginBottom: "6px" }}>
              {vc.headline}
            </div>
            <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: C.textMid, lineHeight: 1.5 }}>{vc.sub}</div>
          </div>
        </div>
      </div>

      {/* Diagnosis label + severity + EM badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "14px" }}>
        <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "16px", color: C.textDark }}>
          Likely diagnosis: {entry.label}
        </span>
        <SeverityBadge severity={entry.severity} />
        {entry.emVerified && <EMBadge>{entry.enquiriesLabel}</EMBadge>}
      </div>

      {/* Chassis mapping */}
      <ChassisMapping chassis={entry.chassis} />

      {/* Cost breakdown */}
      <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: "10px", overflow: "hidden", marginBottom: "16px" }}>
        <div style={{ background: C.navy, padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", fontWeight: 700, color: C.muted, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            Your Estimated Cost Breakdown
          </div>
          <span
            style={{
              fontFamily: "'Lato', sans-serif",
              fontSize: "9px",
              fontWeight: 800,
              color: "#94a3b8",
              border: "1px solid rgba(255,255,255,0.2)",
              padding: "2px 8px",
              borderRadius: "100px",
            }}
          >
            EM-QUOTE
          </span>
        </div>
        <div style={{ padding: "20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {[
              { label: `Repair Cost (${entry.label.split(" (")[0]})`, value: `${fmt(entry.repairCost.low)} – ${fmt(entry.repairCost.high)}`, sub: "If caught early — repair, not replace" },
              { label: `${condLabel} Engine/Part`, value: `${fmt(costs.low)} – ${fmt(costs.high)}`, sub: "Supplied & fitted via EnginesMarket", highlight: true },
              { label: "Main Dealer Estimate", value: `${fmt(costs.mdLow)} – ${fmt(costs.mdHigh)}`, sub: "Typical main dealer pricing", strike: true },
              { label: "Replacement as % of Car Value", value: `${pct}%`, sub: `Your car: ${fmt(carValue)}` },
            ].map((row, i) => (
              <div key={i} style={{ padding: "14px", background: row.highlight ? "#f0fdf4" : C.bgCard, borderRadius: "8px", border: `1px solid ${row.highlight ? "#86efac" : C.border}` }}>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px" }}>
                  {row.label}
                </div>
                <div
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900,
                    fontSize: "20px",
                    color: row.highlight ? C.green : row.strike ? "#9ca3af" : C.textDark,
                    textDecoration: row.strike ? "line-through" : "none",
                  }}
                >
                  {row.value}
                </div>
                <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", color: C.muted, marginTop: "3px" }}>{row.sub}</div>
              </div>
            ))}
          </div>

          {saving > 0 && (
            <div style={{ marginTop: "12px", background: "#f0fdf4", border: "1px solid #86efac", borderRadius: "8px", padding: "10px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "18px" }}>💚</span>
              <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "14px", color: C.green, fontWeight: 700 }}>
                Potential saving vs. main dealer: up to {saving}%
              </span>
            </div>
          )}

          {verdict === "D" && scrapNote && (
            <div style={{ marginTop: "12px", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", padding: "12px 16px" }}>
              <span style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "#991b1b", lineHeight: 1.6 }}>{scrapNote}</span>
            </div>
          )}

          {verdict === "C" && (
            <div style={{ marginTop: "14px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {[
                { title: "Option 1 — Replace", detail: `${fmt(costs.low)} – ${fmt(costs.high)} S&F via EnginesMarket`, note: "Your Land Rover retains its value. Cheaper than a replacement vehicle.", color: C.green },
                { title: "Option 2 — Buy a Replacement Vehicle", detail: `${fmt(carValue * 1.1)} – ${fmt(carValue * 1.4)} equivalent used`, note: "Higher upfront cost. May be preferable on older vehicles.", color: "#64748b" },
              ].map((opt, i) => (
                <div key={i} style={{ padding: "14px", background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "8px", borderLeft: `4px solid ${opt.color}` }}>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", fontWeight: 800, color: opt.color, marginBottom: "6px" }}>{opt.title}</div>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "17px", fontWeight: 900, color: C.textDark }}>{opt.detail}</div>
                  <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", color: C.muted, marginTop: "4px" }}>{opt.note}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* OEM Part References */}
      {oemEntries.length > 0 && (
        <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: "10px", padding: "16px 20px", marginBottom: "16px" }}>
          <div style={{ fontFamily: "'Lato', sans-serif", fontSize: "11px", fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px" }}>
            OEM Part References (For Your JLR Specialist)
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {oemEntries.map(([key, value]) => (
              <span
                key={key}
                style={{
                  background: "#fff",
                  padding: "6px 12px",
                  borderRadius: "100px",
                  border: `1px solid ${C.border}`,
                  fontFamily: "'Lato', sans-serif",
                  fontSize: "12.5px",
                  fontWeight: 600,
                  color: C.textDark,
                }}
              >
                {key.replace(/([A-Z])/g, " $1").trim()}: <span style={{ fontWeight: 400, color: C.textMid }}>{value}</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Internal linking */}
      <div style={{ marginBottom: "16px", textAlign: "center" }}>
        <a href={`/engines/${diagnosisKey}`} style={{ fontFamily: "'Lato', sans-serif", fontSize: "13px", color: "#1e40af", textDecoration: "underline" }}>
          Read our full technical breakdown of this failure →
        </a>
      </div>

      {/* Dual CTA */}
      <a
        href={QUOTE_URL}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          minHeight: "56px",
          background: C.green,
          color: C.white,
          border: "none",
          borderRadius: "10px",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontSize: "18px",
          fontWeight: 900,
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          textDecoration: "none",
          boxShadow: "0 4px 20px rgba(21,128,61,0.4)",
          marginBottom: "10px",
        }}
      >
        Get a Reconditioned Engine Quote →
      </a>
      <a
        href={SPECIALIST_URL}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          minHeight: "48px",
          background: "#1e40af",
          color: C.white,
          border: "none",
          borderRadius: "10px",
          fontFamily: "'Lato', sans-serif",
          fontSize: "15px",
          fontWeight: 700,
          textDecoration: "none",
          marginBottom: "10px",
        }}
      >
        Find a Local JLR Repair Specialist →
      </a>
      <div style={{ display: "flex", justifyContent: "center", gap: "18px", flexWrap: "wrap", marginBottom: "16px" }}>
        {["No obligation", "20+ vetted JLR specialists", "Free to use"].map((t) => (
          <span key={t} style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", color: C.muted, fontWeight: 400 }}>
            ✓ {t}
          </span>
        ))}
      </div>
      <button
        onClick={onReset}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: "'Lato', sans-serif",
          fontSize: "13px",
          color: C.muted,
          textDecoration: "underline",
          display: "block",
          margin: "0 auto",
          minHeight: "44px",
        }}
      >
        ← Start again / Try different symptoms
      </button>
    </div>
  );
}

// ─── STATIC SEO TABLE (server-renderable, driven by COST_TABLE) ───────────

export function StaticCostTable() {
  return (
    <div>
      <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: "26px", color: C.white, marginBottom: "20px", letterSpacing: "-0.01em" }}>
        Typical UK Land Rover & Range Rover Replacement Costs by Failure Type
      </h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", minWidth: "640px", borderCollapse: "collapse", fontFamily: "'Lato', sans-serif" }}>
          <thead>
            <tr style={{ background: C.green }}>
              {["Failure Type", "Reconditioned S&F", "Rebuilt S&F", "Used S&F", "Main Dealer Est."].map((h, i) => (
                <th
                  key={i}
                  style={{
                    padding: "12px 16px",
                    textAlign: i === 0 ? "left" : "center",
                    fontFamily: "'Lato', sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: C.white,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STATIC_TABLE_ROWS.map((row, i) => (
              <tr key={row.key} style={{ background: i % 2 === 0 ? "#112240" : "#0d1b2e" }}>
                <td style={{ padding: "14px 16px", fontFamily: "'Lato', sans-serif", fontSize: "13.5px", color: C.white, fontWeight: 600, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                  {row.type}
                  {row.emVerified && (
                    <span style={{ marginLeft: "8px" }}>
                      <EMBadge>EM-VERIFIED</EMBadge>
                    </span>
                  )}
                </td>
                {[row.recon, row.rebuilt, row.used, row.mainDealer].map((val, j) => (
                  <td
                    key={j}
                    style={{
                      padding: "14px 16px",
                      textAlign: "center",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "15px",
                      fontWeight: 700,
                      color: j === 3 ? "#9ca3af" : j === 0 ? C.greenBright : C.muted,
                      textDecoration: j === 3 ? "line-through" : "none",
                      borderBottom: "1px solid rgba(255,255,255,0.06)",
                    }}
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p style={{ fontFamily: "'Lato', sans-serif", fontSize: "12px", color: "rgba(148,163,184,0.6)", marginTop: "14px", lineHeight: 1.6, fontStyle: "italic" }}>
        Cost ranges shown are typical UK market ranges. [EM-VERIFIED] rows are backed by real 2025 EnginesMarket enquiry
        data for the matching Land Rover / Range Rover engine code; other rows cover ancillary systems (EAS, transfer
        case, ZF 8HP, electrical) and are estimates. Actual costs vary by model, generation, location, and supplier.
        Use the calculator above or get free personalised quotes.
      </p>
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function LandRoverDiagnosticCalculator() {
  const [stage, setStage] = useState("q1"); // q1 | q2 | override | vehicle | engine | results
  const [q1, setQ1] = useState(null);
  const [diagnosisKey, setDiagnosisKey] = useState(null);
  const [carAge, setCarAge] = useState(null);
  const [carValue, setCarValue] = useState(8000);
  const [engineCondition, setEngineCondition] = useState("reconditioned");
  const [noMatch, setNoMatch] = useState(false);

  const reset = () => {
    setStage("q1");
    setQ1(null);
    setDiagnosisKey(null);
    setCarAge(null);
    setCarValue(8000);
    setEngineCondition("reconditioned");
    setNoMatch(false);
  };

  const goToDiagnosis = (key) => {
    const entry = COST_TABLE[key];
    if (!entry) {
      setNoMatch(true);
      setDiagnosisKey("unknown");
      setStage("vehicle");
      return;
    }
    setNoMatch(false);
    setDiagnosisKey(key);
    if (entry.severity === "catastrophic" || entry.severity === "immediate") {
      setStage("override");
    } else {
      setStage("vehicle");
    }
  };

  const selectQ2Answer = (answerId) => {
    const key = resolveDiagnosis(q1, answerId);
    goToDiagnosis(key);
  };

  const stagePercent = { q1: 15, q2: 33, override: 33, vehicle: 66, engine: 90, results: 100 }[stage];
  const indicatorStage = stage === "q1" || stage === "q2" || stage === "override" ? 1 : stage === "vehicle" ? 2 : stage === "engine" ? 3 : 3;

  return (
    <div className=" font-sans">
      <div className=" mx-auto  py-[20px]">
        {/* <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full mb-5">
            <span className="w-1.5 h-1.5 bg-[#15803d] rounded-full inline-block" />
            <span className="font-['Lato',sans-serif] text-[11px] font-bold text-[#94a3b8] tracking-[0.12em] uppercase">
              Land Rover & Range Rover Diagnostic Calculator
            </span>
          </div>
          <h2 className="font-['Barlow_Condensed',sans-serif] font-black text-[clamp(28px,5vw,42px)] leading-[1.05] text-white tracking-[-0.02em] mb-3.5 uppercase">
            Tell Us What's Wrong. <span className="text-[#15803d]">Get a Real Diagnosis.</span>
          </h2>
          <p className="font-['Lato',sans-serif] font-light text-base text-[#94a3b8] leading-[1.7] max-w-[560px] mx-auto">
            We understand what this vehicle means to you. Answer a couple of questions about your symptoms, then your
            vehicle, and we'll match it against known Land Rover and Range Rover failure patterns — with an honest
            verdict, OEM part references, and a cost estimate you can trust.
          </p>
        </div> */}

        <div className="text-white rounded-[20px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
          {/* {stage !== "results" && <ProgressBar percent={stagePercent} />} */}
          <div className="p-[clamp(20px,4vw,36px)]">
            {stage === "results" ? (
              <VerdictScreen diagnosisKey={diagnosisKey} carAge={carAge} carValue={carValue} engineCondition={engineCondition} onReset={reset} />
            ) : (
              <>
                <StepIndicator stage={indicatorStage} />

                {noMatch && stage === "vehicle" && (
                  <div className="bg-amber-50 border border-amber-300 rounded-lg p-3.5 px-4.5 mb-5">
                    <span className="font-['Lato',sans-serif] text-[13px] text-amber-800 leading-[1.6]">{FALLBACK_MESSAGE}</span>
                  </div>
                )}

                {/* STEP Q1 — failure category (+ known-fault shortcut) */}
                {stage === "q1" && (
                  <div>
                    <div className="mb-6.5">
                      <div className="font-['Lato',sans-serif] text-xs font-bold text-white tracking-[0.06em] uppercase mb-2.5">
                        Already know the fault? Jump straight to it
                      </div>
                      <div className="grid grid-cols-4 gap-2 max-sm:grid-cols-2">
                        {KNOWN_FAULT_SHORTCUTS.map((s) => {
                          const entry = COST_TABLE[s.diagnosisKey];
                          return (
                            <div
                              key={s.diagnosisKey}
                              className="bg-white border border-[#e2e8f0] rounded-lg px-3 py-2.5 cursor-pointer transition-all duration-150 hover:border-golden hover:shadow-golden flex flex-col gap-1 min-h-[76px] justify-center"
                              onClick={() => goToDiagnosis(s.diagnosisKey)}
                            >
                              <span className="text-lg">{s.icon}</span>
                              <div className="font-['Lato',sans-serif] text-[10.5px] font-extrabold text-[#0d1b2e] leading-[1.25]">
                                {entry.label}
                              </div>
                              {entry.emVerified && (
                                <div className="font-['Lato',sans-serif] text-[9.5px] text-[#15803d] font-bold">
                                  {entry.enquiries.toLocaleString("en-GB")} EM enquiries
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="font-['Lato',sans-serif] text-xs font-bold text-white tracking-[0.06em] uppercase mb-3">
                      Or tell us what type of issue you're experiencing
                    </div>
                    <div className="grid grid-cols-3 gap-2.5 max-sm:grid-cols-2">
                      {Q1_OPTIONS.map((opt) => (
                        <div
                          key={opt.id}
                          className={`bg-white rounded-xl px-3.5 py-4 cursor-pointer transition-all duration-150 flex flex-col items-center text-center gap-2 min-h-[96px] justify-center hover:border-golden hover:shadow-[0_2px_12px_rgba(21,128,61,0.15)] ${q1 === opt.id
                            ? "border-2 border-golden bg-green-50 shadow-[0_0_0_4px_rgba(21,128,61,0.08)]"
                            : "border border-[#e2e8f0]"
                            }`}
                          onClick={() => setQ1(opt.id)}
                        >
                          <span className="text-2xl">{opt.icon}</span>
                          <div className="font-['Lato',sans-serif] text-xs font-extrabold text-[#0d1b2e] leading-[1.3]">
                            {opt.label}
                          </div>
                          <div className="font-['Lato',sans-serif] text-[10.5px] text-[#94a3b8] leading-[1.4]">
                            {opt.desc}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      className="w-full min-h-[54px] bg-golden text-black border-none rounded-lg font-['Barlow_Condensed',sans-serif] text-lg font-black tracking-[0.05em] uppercase cursor-pointer shadow-[0_4px_16px_rgba(21,128,61,0.35)] transition-colors duration-150 mt-2 hover:bg-golden/95 disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
                      disabled={!q1}
                      onClick={() => setStage("q2")}
                    >
                      Next Step →
                    </button>
                  </div>
                )}

                {/* STEP Q2 — specific symptom within category */}
                {stage === "q2" && q1 && (
                  <div>
                    <div className="font-['Barlow_Condensed',sans-serif] font-extrabold text-[19px] text-[#0d1b2e] mb-4.5">
                      {DIAGNOSTIC_TREE[q1].question}
                    </div>
                    {DIAGNOSTIC_TREE[q1].answers.map((a) => (
                      <button
                        key={a.id}
                        className="w-full text-left px-4 py-3.5 border border-[#e2e8f0] rounded-lg bg-white cursor-pointer mb-2.5 font-['Lato',sans-serif] text-[13.5px] text-[#0d1b2e] leading-5 min-h-[44px] transition-all duration-150 hover:border-golden hover:bg-slate-50"
                        onClick={() => selectQ2Answer(a.id)}
                      >
                        {a.label}
                      </button>
                    ))}
                    <button
                      className="w-full text-left px-4 py-3.5 border border-dashed border-[#e2e8f0] rounded-lg bg-white cursor-pointer mb-2.5 font-['Lato',sans-serif] text-[13.5px] text-[#64748b] leading-5 min-h-[44px] transition-all duration-150 hover:border-golden hover:bg-slate-50"
                      onClick={() => {
                        setDiagnosisKey("unknown");
                        setNoMatch(true);
                        setStage("vehicle");
                      }}
                    >
                      None of these match — Not Sure / Multiple Issues
                    </button>
                    <button className="bg-none border-none cursor-pointer font-['Lato',sans-serif] text-sm text-slate-300 underline p-1 min-h-[44px]" onClick={() => setStage("q1")}>
                      ← Back
                    </button>
                  </div>
                )}

                {/* STEP OVERRIDE — catastrophic / immediate safety screen */}
                {stage === "override" && diagnosisKey && (
                  <OverrideScreen entry={COST_TABLE[diagnosisKey]} onContinue={() => setStage("vehicle")} />
                )}

                {/* STEP VEHICLE */}
                {stage === "vehicle" && (
                  <div>
                    <div className="font-['Barlow_Condensed',sans-serif] font-extrabold text-xl  mb-5.5">
                      Tell us about your vehicle
                    </div>

                    <div className="mb-6.5">
                      <div className="font-['Lato',sans-serif] text-[13px] font-bold text-gray-300 tracking-[0.06em] uppercase mb-3">
                        Vehicle Age
                      </div>
                      <div className="flex gap-2.5 flex-wrap">
                        {CAR_AGES.map((a) => (
                          <button
                            key={a.id}
                            className={`px-4.5 py-2.5 rounded-full border cursor-pointer font-['Lato',sans-serif] text-sm font-bold text-gray-500  transition-all duration-150 min-h-[44px] whitespace-nowrap hover:border-golden hover:text-golden ${carAge === a.id
                              ? "bg-golden text-white border-golden hover:border-golden hover:text-white"
                              : "border-[#e2e8f0] bg-white"
                              }`}
                            onClick={() => setCarAge(a.id)}
                          >
                            {a.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-6.5">
                      <div className="font-['Lato',sans-serif] text-[13px] font-bold text-white tracking-[0.06em] uppercase mb-1.5">
                        Estimated Current Vehicle Value
                      </div>
                      <div className="font-['Lato',sans-serif] text-xs text-gray-300 mb-3.5 leading-[1.5]">
                        What would your Land Rover or Range Rover sell for in its current condition, before this fault?
                      </div>
                      <div className="bg-green-50 border border-green-300 rounded-lg p-4 px-5 mb-3.5 text-center">
                        <div className="font-['Barlow_Condensed',sans-serif] font-black text-[34px] text-golden">
                          {fmt(carValue)}
                        </div>
                        <div className="font-['Lato',sans-serif] text-[11px] text-gray-300">estimated vehicle value</div>
                      </div>
                      <input
                        type="range"
                        className="w-full accent-golden cursor-pointer h-1 mb-2"
                        min={0}
                        max={VALUE_STEPS.length - 1}
                        step={1}
                        value={VALUE_STEPS.indexOf(VALUE_STEPS.reduce((p, c) => (Math.abs(c - carValue) < Math.abs(p - carValue) ? c : p)))}
                        onChange={(e) => setCarValue(VALUE_STEPS[parseInt(e.target.value, 10)])}
                      />
                      <div className="flex justify-between">
                        {VALUE_STEPS.map((v) => (
                          <span key={v} className="font-['Lato',sans-serif] text-[10px] text-[#94a3b8]">
                            {v >= 20000 ? "£20k+" : v >= 1000 ? `£${v / 1000}k` : `£${v}`}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-3 items-center">
                      <button className="bg-none border-none cursor-pointer font-['Lato',sans-serif] text-sm text-slate-300 underline p-1 min-h-[44px]" onClick={() => setStage(q1 ? "q2" : "q1")}>
                        ← Back
                      </button>
                      <button
                        className="flex-1 min-h-[54px] bg-golden text-white border-none rounded-lg font-['Barlow_Condensed',sans-serif] text-lg font-black tracking-[0.05em] uppercase cursor-pointer shadow-[0_4px_16px_rgba(21,128,61,0.35)] transition-colors duration-150 hover:bg-golden disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
                        disabled={!carAge}
                        onClick={() => setStage("engine")}
                      >
                        Next Step →
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP ENGINE / PART CONDITION */}
                {stage === "engine" && (
                  <div>
                    <div className="font-['Barlow_Condensed',sans-serif] font-extrabold text-xl text-white mb-2">
                      What type of replacement are you open to?
                    </div>
                    <div className="font-['Lato',sans-serif] text-[13px] text-gray-300 mb-5.5">
                      Not sure which is right? We'll show you the cost difference in your results.
                    </div>
                    <div className="flex gap-3 mb-6.5 max-sm:flex-col">
                      {ENGINE_CONDITIONS.map((c) => (
                        <button
                          key={c.id}
                          className={`flex-1 px-3.5 py-4.5 border rounded-lg bg-white cursor-pointer text-center transition-all duration-150 min-h-[60px] hover:border-golden ${engineCondition === c.id
                            ? "border-2 border-golden bg-green-50"
                            : "border-[#e2e8f0]"
                            }`}
                          onClick={() => setEngineCondition(c.id)}
                        >
                          <div className="font-['Barlow_Condensed',sans-serif] font-extrabold text-base text-[#0d1b2e] mb-1.5">
                            {c.label}
                          </div>
                          <div className={`font-['Lato',sans-serif] text-[12.5px] font-bold ${engineCondition === c.id ? "text-golden" : "text-[#94a3b8]"}`}>
                            {c.from}
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-3 items-center">
                      <button className="bg-none border-none cursor-pointer font-['Lato',sans-serif] text-sm text-slate-300 underline p-1 min-h-[44px]" onClick={() => setStage("vehicle")}>
                        ← Back
                      </button>
                      <button
                        className="flex-1 min-h-[54px] bg-golden text-black border-none rounded-lg font-['Barlow_Condensed',sans-serif] text-lg font-black tracking-[0.05em] uppercase cursor-pointer shadow-[0_4px_16px_rgba(21,128,61,0.35)] transition-colors duration-150 hover:bg-golden"
                        onClick={() => setStage("results")}
                      >
                        See My Results →
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-12">
          {/* <StaticCostTable /> */}
        </div>
      </div>
    </div>
  );
}
