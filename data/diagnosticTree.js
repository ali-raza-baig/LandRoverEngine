/**
 * DIAGNOSTIC_TREE — LandRoverEngine.uk Diagnostic Calculator
 * -------------------------------------------------------------
 * Implements PATH A → PATH E from the specification (Part 2).
 * Q1 = failure category. Q2 = the specific symptom description.
 * Each Q2 answer resolves to a `diagnosisKey` matching an entry in
 * COST_TABLE (see costTable.js).
 *
 * Several answers share a diagnosisKey by design (e.g. A3 and B3 both
 * point to the transfer case; A4 and D3 both point to the ZF 8HP; C4 and
 * E2 both point to the turbo actuator) — this mirrors the source
 * specification, where the same underlying fault can present through
 * more than one symptom path.
 */

export const Q1_OPTIONS = [
  { id: "A", icon: "🔊", label: "Unusual Noises", desc: "Rattling, knocking, whining or grinding sounds" },
  { id: "B", icon: "🚙", label: "Ride Height & 4x4 Issues", desc: "Sagging, air suspension faults, Terrain Response warnings" },
  { id: "C", icon: "💧", label: "Fluid Leaks, Smells or Smoke", desc: "Coolant loss, diesel smell, smoke from the exhaust" },
  { id: "D", icon: "⚠️", label: "Dashboard, Electrical or Water Ingress", desc: "Warning lights, limp mode, battery drain, faults after rain" },
  { id: "E", icon: "🚗", label: "Loss of Power or Rough Running", desc: "Hesitation, stalling, turbo issues, high oil consumption" },
];

export const DIAGNOSTIC_TREE = {
  A: {
    question: "Where is the noise coming from and what does it sound like?",
    answers: [
      {
        id: "A1",
        label: "Light metallic rattling from the rear of the engine (firewall side) on cold start",
        diagnosisKey: "ingeniumTimingChain",
      },
      {
        id: "A2",
        label: "Deep metallic knock from the bottom of the engine (V-bank), especially on cold start or under load",
        diagnosisKey: "tdv6Crankshaft",
      },
      {
        id: "A3",
        label: "Whining, groaning, or clunking from the centre of the car, worsening when turning or accelerating",
        diagnosisKey: "transferCase",
      },
      {
        id: "A4",
        label: "Clunk, shudder, or whine from the transmission tunnel, especially at low speeds or shifting",
        diagnosisKey: "zf8hp",
      },
      {
        id: "A5",
        label: "Rapid ticking or \"sewing machine\" sound from the top of the engine",
        diagnosisKey: "tdv8TimingChain",
      },
    ],
  },
  B: {
    question: "How is the vehicle behaving regarding height or traction?",
    answers: [
      {
        id: "B1",
        label: "One corner or the whole vehicle sags overnight, but rises normally in the morning",
        diagnosisKey: "airSuspensionLeak",
      },
      {
        id: "B2",
        label: "Vehicle is completely dropped, compressor runs constantly or sounds like a grinder",
        diagnosisKey: "easCompressor",
      },
      {
        id: "B3",
        label: "\"Terrain Response Fault\" or \"4x4 Not Available\" warning, sometimes with a clunk when engaging",
        diagnosisKey: "transferCase",
      },
      {
        id: "B4",
        label: "Steering wheel vibrates or pulls, \"Suspension Fault\" on dash, but ride height seems okay",
        diagnosisKey: "easHeightSensor",
      },
    ],
  },
  C: {
    question: "What fluid are you losing, or what does the smoke/smell indicate?",
    answers: [
      {
        id: "C1",
        label: "Coolant loss, no external puddles, but a crusty white/green residue in the valley of the V-engine",
        diagnosisKey: "sdv8OilCooler",
      },
      {
        id: "C2",
        label: "Strong raw diesel smell in the cabin, with black carbon buildup around the injectors",
        diagnosisKey: "duratorqInjector",
      },
      {
        id: "C3",
        label: "Sweet smell of coolant in the cabin, white exhaust mist, and engine running rough",
        diagnosisKey: "ingeniumEgrCooler",
      },
      {
        id: "C4",
        label: "Thick blue smoke on startup or under hard acceleration, with high oil consumption",
        diagnosisKey: "turboActuator",
      },
    ],
  },
  D: {
    question: "What specific warning lights or electrical issues are occurring?",
    answers: [
      {
        id: "D1",
        label: "\"Engine Fault\", \"Restricted Performance\", or limp mode, especially after short city trips",
        diagnosisKey: "dpfSwirlFlap",
      },
      {
        id: "D2",
        label: "Battery constantly dies overnight, or \"System Fault\" messages appear after rain",
        diagnosisKey: "waterIngress",
      },
      {
        id: "D3",
        label: "\"Gearbox Fault\" or severe shuddering at low speeds, but the engine runs perfectly",
        diagnosisKey: "zf8hp",
      },
      {
        id: "D4",
        label: "\"Battery Discharge\" warning, but the battery is new, and modules won't sleep",
        diagnosisKey: "parasiticDrain",
      },
    ],
  },
  E: {
    question: "How does the engine feel when driving?",
    answers: [
      {
        id: "E1",
        label: "Severe hesitation, \"lean mixture\" codes, or the engine cranks but won't start",
        diagnosisKey: "hpfpFailure",
      },
      {
        id: "E2",
        label: "Noticeable loss of power, \"turbo under/over boost\" codes, or whining from the turbo",
        diagnosisKey: "turboActuator",
      },
      {
        id: "E3",
        label: "Engine oil level is increasing on the dipstick, smelling strongly of diesel",
        diagnosisKey: "oilDilution",
      },
    ],
  },
};

/**
 * Resolve a Q1 + Q2 answer to a COST_TABLE key. Falls back to "unknown"
 * if no match is found — this should never crash the calculator.
 */
export function resolveDiagnosis(q1Id, answerId) {
  const branch = DIAGNOSTIC_TREE[q1Id];
  if (!branch) return "unknown";
  const match = branch.answers.find((a) => a.id === answerId);
  return match ? match.diagnosisKey : "unknown";
}
