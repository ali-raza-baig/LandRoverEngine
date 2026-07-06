import { COST_TABLE } from "../data/costTable";

/**
 * VERDICT_CONFIG — display config for each of the four verdict outcomes.
 * Copy is written for the "white-glove" tone the spec calls for (Part
 * 1.4): empathetic about the investment, authoritative about the fix.
 */
export const VERDICT_CONFIG = {
  A: {
    emoji: "✅",
    color: "#15803d",
    bg: "#f0fdf4",
    border: "#86efac",
    headline: "Replacement is likely worth it for your Land Rover.",
    sub: "Based on your inputs, engine or system replacement makes financial sense for your premium vehicle.",
  },
  B: {
    emoji: "⚖️",
    color: "#b45309",
    bg: "#fffbeb",
    border: "#fcd34d",
    headline: "Replacement is borderline. Get real quotes first.",
    sub: "Real quotes from our vetted JLR specialist network could change this picture significantly.",
  },
  C: {
    emoji: "🔄",
    color: "#1d4ed8",
    bg: "#eff6ff",
    border: "#93c5fd",
    headline: "You have two strong options. Here's the comparison.",
    sub: "Your vehicle's value supports both replacement and a used-vehicle purchase — this is genuinely a choice, not a forced decision.",
  },
  D: {
    emoji: "⚠️",
    color: "#dc2626",
    bg: "#fef2f2",
    border: "#fca5a5",
    headline: "Replacement costs may exceed your vehicle's value.",
    sub: "Consider all options carefully — but specialist quotes may still surprise you.",
  },
};

/**
 * getVerdict — the ABCD decision matrix, implemented exactly as defined
 * in the specification (Part 3.2 / Part 5.3).
 *
 * @param {string} diagnosisKey  key into COST_TABLE
 * @param {string} carAge        "under5" | "5to10" | "10to15" | "over15"
 * @param {number} carValue      estimated vehicle value in GBP
 * @param {string} engineCondition "reconditioned" | "rebuilt" | "used"
 */
export function getVerdict(diagnosisKey, carAge, carValue, engineCondition) {
  const entry = COST_TABLE[diagnosisKey] || COST_TABLE.unknown;
  const costs = entry[engineCondition];
  const mid = (costs.low + costs.high) / 2;
  const pct = Math.round((mid / carValue) * 100);
  const saving = Math.round(((costs.mdLow - costs.low) / costs.mdLow) * 100);

  // Determine if the user should consider scrapping
  const isScrap = carValue < 1500 || (carAge === "over15" && carValue < 2500);

  // High-value vehicle facing one of the three highest-cost catastrophic
  // failures — replacement vs. buying a different vehicle is a genuine
  // two-option decision here, not a foregone conclusion.
  const isVsNew =
    carValue > 12000 && ["tdv6Crankshaft", "sdv8OilCooler", "tdv8TimingChain"].includes(diagnosisKey);

  let verdict;
  if (isScrap) {
    verdict = "D";
  } else if (isVsNew) {
    verdict = "C";
  } else if (carValue > mid * 2) {
    verdict = "A";
  } else if (carValue >= mid) {
    verdict = "B";
  } else {
    verdict = "D";
  }

  return {
    verdict,
    entry,
    costs,
    mid,
    pct,
    saving: saving > 0 ? saving : 0,
    scrapNote: verdict === "D" ? getScrapNote(carAge) : null,
  };
}

/**
 * getScrapNote — dynamic Verdict D messaging, implemented as given in the
 * specification (Part 3.4).
 */
export function getScrapNote(carAge) {
  const isOver10Years = carAge === "over15" || carAge === "10to15";

  if (isOver10Years) {
    return "⚠️ Replacement costs may exceed your vehicle's value. If your vehicle is over 10 years old, consider getting a scrap valuation before committing to replacement. Typical scrap values for non-running luxury SUVs range from £200–£600 depending on condition and spec.";
  }
  return "⚠️ While replacement costs are significant, your vehicle's age suggests it may still be worth repairing. Compare specialist quotes before making a final decision. Land Rovers and Range Rovers often retain value better than standard vehicles when properly maintained.";
}

/**
 * FALLBACK_MESSAGE — shown when a symptom combination can't be resolved
 * to a known diagnosis. The calculator should never crash or render a
 * blank result; it always resolves to "unknown" and shows this copy.
 */
export const FALLBACK_MESSAGE =
  "We couldn't find an exact match for your symptoms. Our database currently covers the most common Land Rover and Range Rover failure patterns. Please select \"Not Sure / Multiple Issues\" or contact a JLR specialist for a full diagnosis.";

export function fmt(n) {
  return "£" + Math.round(n).toLocaleString("en-GB");
}
