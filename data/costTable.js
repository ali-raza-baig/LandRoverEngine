/**
 * COST_TABLE — LandRoverEngine.uk Diagnostic Calculator
 * -------------------------------------------------------
 * Single source of truth for all pricing shown in the calculator and the
 * static SEO table. Every entry maps to one of the diagnoses produced by
 * the PATH A–E decision trees in the specification (Part 2).
 *
 * Data provenance:
 *  - Entries tagged emVerified: true are backed by real 2025 enquiry/cost
 *    data for the matching engine code in EM_Proprietary_Data_2025.txt.
 *    Their `repairCost`, `enquiries` and replacement `low/high` figures
 *    trace directly back to that file.
 *  - Entries tagged emVerified: false cover ancillary/system failures
 *    (air suspension, transfer case, ZF 8HP, DPF/EGR, electrical, water
 *    ingress) that sit outside EM's engine-code enquiry data. Their
 *    figures come from the diagnostic-tree specification supplied
 *    directly by the client and are labelled as estimates, not
 *    [EM-VERIFIED].
 *
 * OEM part number note:
 *  - The source specification reused the placeholder "LR012345 /
 *    LR012346 / LR012347" across several unrelated components (turbo
 *    actuator, DPF sensor, sunroof drain tube, BMS sensor, HPFP,
 *    injector, fuel rail — a single part number cannot genuinely apply
 *    to all of these). Per the spec's own governance note (Part 9.2:
 *    "Where uncertainty exists, mark the part as [CONFIRM WITH
 *    SPECIALIST]"), those placeholder numbers have been replaced with
 *    "Confirm with specialist" rather than published as if verified.
 *    Every other part number below is unique to its component and is
 *    reproduced as given in the specification.
 *
 * All monetary fields are GBP, supply-only unless noted. `mdLow`/`mdHigh`
 * are typical UK main-dealer full-replacement estimates for comparison.
 * `severity` follows the spec's four-tier system (Part 17):
 *  catastrophic (🔴) > immediate (🟠) > monitor (🟡) > low (🟢).
 */

const CONFIRM = "Confirm with specialist";

export const COST_TABLE = {
  // 1 — PATH A1: Ingenium (204DTD/204PT) timing chain tensioner
  ingeniumTimingChain: {
    label: "Ingenium (204DTD/204PT) Timing Chain Tensioner",
    severity: "monitor",
    repairCost: { low: 1200, high: 2500 },
    reconditioned: { low: 3500, high: 5800, mdLow: 6000, mdHigh: 10000 },
    rebuilt: { low: 2800, high: 4500, mdLow: 6000, mdHigh: 10000 },
    used: { low: 2000, high: 3500, mdLow: 6000, mdHigh: 10000 },
    oemParts: {
      chainTensioner: "LR132655",
      timingChain: "LR131468",
      guideRail: "LR132656",
    },
    emVerified: true,
    enquiries: 1150,
    enquiriesLabel: "204DTD — 1,150 enquiries in 2025",
    engineFamily: "204DTD / 204PT (Ingenium)",
    chassis: ["L550", "L551", "L560", "X760", "X260", "L462"],
  },

  // 2 — PATH A2: TDV6/SDV6 (306DT/276DT) crankshaft bearing / oil pump
  tdv6Crankshaft: {
    label: "TDV6/SDV6 (306DT/276DT) Crankshaft Bearing & Oil Pump Failure",
    severity: "catastrophic",
    repairCost: { low: 5500, high: 7000 },
    reconditioned: { low: 6500, high: 9500, mdLow: 12000, mdHigh: 18000 },
    rebuilt: { low: 5500, high: 7000, mdLow: 12000, mdHigh: 18000 },
    used: { low: 3500, high: 5500, mdLow: 12000, mdHigh: 18000 },
    oemParts: {
      oilPumpAssembly: "LR031931 (supersedes LR019319)",
      mainBearingShellKit: "LR011466",
      crankshaftThrustWasher: "ERR3888",
    },
    emVerified: true,
    enquiries: 980,
    enquiriesLabel: "306DT — 980 enquiries in 2025",
    engineFamily: "306DT (TDV6/SDV6 3.0)",
    chassis: ["L320", "L319", "L322"],
    overrideCopy: {
      headline: "DO NOT DRIVE THIS VEHICLE",
      body: "This pattern matches a known crankshaft bearing or oil pump failure. Continuing to drive can turn a rebuildable fault into total, irreversible engine destruction.",
      actions: [
        "Do not start the engine again if it will not start naturally.",
        "Arrange vehicle recovery rather than driving further.",
        "Contact a JLR specialist for a full inspection before any repair decision.",
      ],
    },
  },

  // 3 — PATH A3 / B3: Transfer case (ATC300/400) chain stretch or actuator
  transferCase: {
    label: "Transfer Case (ATC300/ATC400) Chain Stretch / Actuator",
    severity: "monitor",
    repairCost: { low: 800, high: 1500 },
    reconditioned: { low: 2500, high: 4500, mdLow: 4500, mdHigh: 7000 },
    rebuilt: { low: 2000, high: 3500, mdLow: 4500, mdHigh: 7000 },
    used: { low: 1500, high: 2800, mdLow: 4500, mdHigh: 7000 },
    oemParts: {
      chainKit: "LR072313",
      actuatorMotor: "LR023916",
      transferCaseOil: "LR010852",
    },
    emVerified: false,
    engineFamily: "ATC300 / ATC400 transfer case",
    chassis: ["L320", "L322", "L405", "L319"],
  },

  // 4 — PATH A4 / D3: ZF 8HP mechatronic / torque converter / valve body
  zf8hp: {
    label: "ZF 8HP Mechatronic Sleeve / Torque Converter / Valve Body",
    severity: "monitor",
    repairCost: { low: 1200, high: 2500 },
    reconditioned: { low: 4000, high: 7000, mdLow: 6000, mdHigh: 10000 },
    rebuilt: { low: 3000, high: 5500, mdLow: 6000, mdHigh: 10000 },
    used: { low: 2200, high: 4500, mdLow: 6000, mdHigh: 10000 },
    oemParts: {
      mechatronicSleeve: "24158610980",
      bridgeSeal: "24158613352",
      valveBody: "1069801972",
    },
    emVerified: false,
    engineFamily: "ZF 8HP automatic transmission",
    chassis: ["L405", "L494", "L550", "L462", "L560"],
  },

  // 5 — PATH A5: TDV8 3.6 (368DT) timing chain tensioner / guide
  tdv8TimingChain: {
    label: "TDV8 3.6 (368DT) Timing Chain Tensioner / Guide",
    severity: "immediate",
    repairCost: { low: 1500, high: 3000 },
    reconditioned: { low: 5500, high: 8000, mdLow: 10000, mdHigh: 15000 },
    rebuilt: { low: 4500, high: 6500, mdLow: 10000, mdHigh: 15000 },
    used: { low: 3000, high: 4800, mdLow: 10000, mdHigh: 15000 },
    oemParts: {
      tensioner: "LR012879",
      guideRail: "LR012878",
      chain: "LR012876",
    },
    emVerified: true,
    enquiries: 650,
    enquiriesLabel: "368DT — 650 enquiries in 2025",
    engineFamily: "368DT (3.6 TDV8)",
    chassis: ["L322", "L320"],
    overrideCopy: {
      headline: "ARRANGE RECOVERY — CHAIN SNAP RISK",
      body: "This pattern matches a known 368DT timing chain tensioner and guide fault. If the chain snaps while driving it can cause catastrophic internal engine damage with no warning.",
      actions: [
        "Avoid further driving if the ticking is rapid or worsening.",
        "Arrange vehicle recovery rather than risk a chain failure on the road.",
        "Contact a JLR specialist for a full inspection before any repair decision.",
      ],
    },
  },

  // 6 — PATH B1: Air suspension (EAS) air leak — valve block or air spring
  airSuspensionLeak: {
    label: "Air Suspension (EAS) Air Leak — Valve Block or Air Spring",
    severity: "low",
    repairCost: { low: 300, high: 800 },
    reconditioned: { low: 1200, high: 3000, mdLow: 2500, mdHigh: 5000 },
    rebuilt: { low: 800, high: 2000, mdLow: 2500, mdHigh: 5000 },
    used: { low: 400, high: 1200, mdLow: 2500, mdHigh: 5000 },
    oemParts: {
      airSpring: "LR013637",
      valveBlockSealKit: "LR019318",
      airLine: "LR012956",
    },
    emVerified: false,
    engineFamily: "EAS (Electronic Air Suspension)",
    chassis: ["L322", "L405", "L494", "L319", "L550", "L560"],
  },

  // 7 — PATH B2: EAS compressor burnout / exhaust valve block failure
  easCompressor: {
    label: "EAS Compressor Burnout / Exhaust Valve Block Failure",
    severity: "catastrophic",
    repairCost: { low: 600, high: 1200 },
    reconditioned: { low: 1800, high: 4000, mdLow: 3500, mdHigh: 6000 },
    rebuilt: { low: 1200, high: 2800, mdLow: 3500, mdHigh: 6000 },
    used: { low: 600, high: 1800, mdLow: 3500, mdHigh: 6000 },
    oemParts: {
      compressor: "LR058014",
      exhaustValveBlock: "LR013619",
      relay: "LR045244",
    },
    emVerified: false,
    engineFamily: "EAS (Electronic Air Suspension)",
    chassis: ["L322", "L405", "L494", "L319", "L550", "L560"],
    fireRisk: true,
    overrideCopy: {
      headline: "DO NOT ATTEMPT TO RAISE THE VEHICLE — FIRE RISK",
      body: "This pattern matches a known EAS compressor burnout. A compressor running continuously can overheat and presents a genuine fire risk.",
      actions: [
        "Do not attempt to raise the vehicle using the compressor.",
        "Switch off the ignition if you notice a burning smell.",
        "Arrange recovery or contact a JLR air suspension specialist.",
      ],
    },
  },

  // 8 — PATH B4: EAS height sensor corrosion / linkage failure
  easHeightSensor: {
    label: "EAS Height Sensor Corrosion / Linkage Failure",
    severity: "low",
    repairCost: { low: 200, high: 500 },
    reconditioned: { low: 800, high: 1800, mdLow: 1500, mdHigh: 3000 },
    rebuilt: { low: 650, high: 1400, mdLow: 1500, mdHigh: 3000 },
    used: { low: 450, high: 1000, mdLow: 1500, mdHigh: 3000 },
    oemParts: {
      heightSensor: "LR010297",
      linkage: "LR010298",
    },
    emVerified: false,
    engineFamily: "EAS (Electronic Air Suspension)",
    chassis: ["L322", "L405", "L494", "L319", "L550", "L560"],
  },

  // 9 — PATH C1: 4.4 V8 (448DT/508PS) oil cooler & coolant crossover leak
  sdv8OilCooler: {
    label: "4.4 V8 (448DT/508PS) Oil Cooler & Coolant Crossover Leak",
    severity: "catastrophic",
    repairCost: { low: 800, high: 1500 },
    reconditioned: { low: 6000, high: 9000, mdLow: 12000, mdHigh: 18000 },
    rebuilt: { low: 5000, high: 7000, mdLow: 12000, mdHigh: 18000 },
    used: { low: 3500, high: 5500, mdLow: 12000, mdHigh: 18000 },
    oemParts: {
      oilCoolerAssembly: "LR018275",
      coolantCrossoverPipe: "LR018276",
      gasketSet: "LR018277",
    },
    emVerified: true,
    enquiries: 620,
    enquiriesLabel: "508PS — 620 enquiries in 2025",
    engineFamily: "448DT / 508PS (4.4 TDV8/SDV8)",
    chassis: ["L405", "L494"],
    overrideCopy: {
      headline: "STOP DRIVING — COOLANT INGESTION RISK",
      body: "This pattern matches a known oil cooler and coolant crossover leak on the 4.4 V8. Continuing to drive risks coolant entering the oil system and destroying the engine.",
      actions: [
        "Do not start the engine again if it will not start naturally.",
        "Arrange vehicle recovery rather than driving further.",
        "Contact a JLR V8 specialist for a full inspection before any repair decision.",
      ],
    },
  },

  // 10 — PATH C2: 2.2 Duratorq (224DT) injector copper seal leak ("Black Death")
  duratorqInjector: {
    label: "2.2 Duratorq (224DT) Injector Seal Leak (\"Black Death\")",
    severity: "low",
    repairCost: { low: 250, high: 800 },
    reconditioned: { low: 2000, high: 3500, mdLow: 4000, mdHigh: 7000 },
    rebuilt: { low: 1500, high: 2800, mdLow: 4000, mdHigh: 7000 },
    used: { low: 1000, high: 2000, mdLow: 4000, mdHigh: 7000 },
    oemParts: {
      injectorSeal: "13538526936",
      returnLine: "13537796542",
    },
    emVerified: true,
    enquiries: 350,
    enquiriesLabel: "224DT — 350 enquiries in 2025",
    engineFamily: "224DT (2.2 Duratorq)",
    chassis: ["L359", "L538"],
  },

  // 11 — PATH C3: Ingenium EGR cooler internal leak (fire risk)
  ingeniumEgrCooler: {
    label: "Ingenium EGR Cooler Internal Leak",
    severity: "catastrophic",
    repairCost: { low: 400, high: 1200 },
    reconditioned: { low: 3500, high: 5800, mdLow: 6000, mdHigh: 10000 },
    rebuilt: { low: 2800, high: 4500, mdLow: 6000, mdHigh: 10000 },
    used: { low: 2000, high: 3500, mdLow: 6000, mdHigh: 10000 },
    oemParts: {
      egrCooler: "11718587372",
      gasket: "11718587235",
    },
    emVerified: false,
    engineFamily: "204DTD / 204PT (Ingenium)",
    chassis: ["L550", "L551", "L560"],
    fireRisk: true,
    overrideCopy: {
      headline: "DO NOT DRIVE — FIRE RISK",
      body: "This pattern matches a known Ingenium EGR cooler internal leak, a recognised fire-risk fault. Do not start the engine again until it has been inspected.",
      actions: [
        "Do not start the engine again if it will not start naturally.",
        "Arrange vehicle recovery rather than driving further.",
        "Contact a JLR specialist for a full inspection before any repair decision.",
      ],
    },
  },

  // 12 — PATH C4 / E2: Turbocharger seal / actuator / VNT geometry failure
  turboActuator: {
    label: "Turbocharger Actuator / VNT Geometry / Seal Failure",
    severity: "monitor",
    repairCost: { low: 500, high: 900 },
    reconditioned: { low: 3500, high: 6500, mdLow: 5000, mdHigh: 10000 },
    rebuilt: { low: 2800, high: 4500, mdLow: 5000, mdHigh: 10000 },
    used: { low: 2000, high: 3500, mdLow: 5000, mdHigh: 10000 },
    oemParts: {
      actuator: CONFIRM,
      turbocharger: `${CONFIRM} (engine-specific)`,
    },
    emVerified: false,
    engineFamily: "All JLR diesel engines",
    chassis: ["All JLR diesel models"],
  },

  // 13 — PATH D1: DPF blockage & inlet manifold swirl flap failure
  dpfSwirlFlap: {
    label: "DPF Blockage & Inlet Manifold Swirl Flap Failure",
    severity: "monitor",
    repairCost: { low: 300, high: 800 },
    reconditioned: { low: 1500, high: 4000, mdLow: 2500, mdHigh: 6000 },
    rebuilt: { low: 1000, high: 2800, mdLow: 2500, mdHigh: 6000 },
    used: { low: 600, high: 1800, mdLow: 2500, mdHigh: 6000 },
    oemParts: {
      dpfPressureSensor: CONFIRM,
      swirlFlapLink: CONFIRM,
      egrValve: "11718595103",
    },
    emVerified: false,
    engineFamily: "All JLR diesel engines (esp. L550, L551)",
    chassis: ["L550", "L551", "L560", "L462"],
  },

  // 14 — PATH D2: Panoramic sunroof drain blockage / water ingress
  waterIngress: {
    label: "Panoramic Sunroof Drain Blockage / Water Ingress",
    severity: "low",
    repairCost: { low: 200, high: 500 },
    reconditioned: { low: 800, high: 2500, mdLow: 1500, mdHigh: 4000 },
    rebuilt: { low: 500, high: 1500, mdLow: 1500, mdHigh: 4000 },
    used: { low: 300, high: 1000, mdLow: 1500, mdHigh: 4000 },
    oemParts: {
      drainTube: CONFIRM,
      bodyControlModule: CONFIRM,
      fuseBox: CONFIRM,
    },
    emVerified: false,
    engineFamily: "N/A — body/electrical fault",
    chassis: ["L494", "L405", "L550", "L560"],
  },

  // 15 — PATH D4: Parasitic battery drain / BMS fault
  parasiticDrain: {
    label: "Parasitic Battery Drain / BMS (Battery Monitoring Sensor) Fault",
    severity: "low",
    repairCost: { low: 150, high: 400 },
    reconditioned: { low: 500, high: 1200, mdLow: 1000, mdHigh: 2500 },
    rebuilt: { low: 300, high: 800, mdLow: 1000, mdHigh: 2500 },
    used: { low: 150, high: 400, mdLow: 1000, mdHigh: 2500 },
    oemParts: {
      bmsSensor: CONFIRM,
      alternator: CONFIRM,
    },
    emVerified: false,
    engineFamily: "N/A — electrical fault (all stop-start models)",
    chassis: ["All JLR models with stop-start"],
  },

  // 16 — PATH E1: High-pressure fuel pump (HPFP) / injector failure
  hpfpFailure: {
    label: "High-Pressure Fuel Pump (HPFP) / Injector Failure",
    severity: "immediate",
    repairCost: { low: 800, high: 1500 },
    reconditioned: { low: 3500, high: 5800, mdLow: 6000, mdHigh: 10000 },
    rebuilt: { low: 2800, high: 4500, mdLow: 6000, mdHigh: 10000 },
    used: { low: 2000, high: 3500, mdLow: 6000, mdHigh: 10000 },
    oemParts: {
      hpfp: CONFIRM,
      injector: CONFIRM,
      fuelRail: CONFIRM,
    },
    emVerified: false,
    engineFamily: "All JLR diesel engines",
    chassis: ["All JLR diesel models"],
    overrideCopy: {
      headline: "ARRANGE RECOVERY — VEHICLE MAY STALL",
      body: "This pattern matches a known high-pressure fuel pump or injector failure. The vehicle may stall without warning, including at speed or in traffic.",
      actions: [
        "Avoid further driving if the vehicle is hesitating or struggling to start.",
        "Arrange recovery rather than risk a stall in traffic.",
        "Contact a JLR diesel specialist for a full inspection before any repair decision.",
      ],
    },
  },

  // 17 — PATH E3: Ingenium (204DTD) oil dilution from failed DPF regeneration
  oilDilution: {
    label: "Ingenium (204DTD) Oil Dilution from Failed DPF Regeneration",
    severity: "monitor",
    repairCost: { low: 200, high: 500 },
    reconditioned: { low: 3500, high: 5800, mdLow: 6000, mdHigh: 10000 },
    rebuilt: { low: 2800, high: 4500, mdLow: 6000, mdHigh: 10000 },
    used: { low: 2000, high: 3500, mdLow: 6000, mdHigh: 10000 },
    oemParts: {
      oilFilter: CONFIRM,
      dpfSensor: CONFIRM,
    },
    emVerified: false,
    engineFamily: "204DTD (Ingenium Diesel)",
    chassis: ["L550", "L551", "L560"],
  },

  // 18 — Fallback / "Not Sure" catch-all
  unknown: {
    label: "Not Sure / Multiple Issues",
    severity: "monitor",
    repairCost: { low: 500, high: 2000 },
    reconditioned: { low: 1800, high: 7000, mdLow: 6000, mdHigh: 14000 },
    rebuilt: { low: 1200, high: 5000, mdLow: 6000, mdHigh: 14000 },
    used: { low: 850, high: 3000, mdLow: 6000, mdHigh: 14000 },
    oemParts: {},
    emVerified: false,
    engineFamily: "Requires specialist inspection",
    chassis: ["All JLR models"],
  },
};

/**
 * CHASSIS_REFERENCE — friendly names for chassis codes, reproduced from
 * the specification's Part 16 appendix. Used to expand raw codes (e.g.
 * "L320") into a readable label ("Range Rover Sport L320 (2005–2013)")
 * in the results screen's chassis-mapping section.
 */
export const CHASSIS_REFERENCE = {
  L316: { model: "Defender (Classic)", years: "1990–2016" },
  L319: { model: "Discovery 3/4", years: "2004–2016" },
  L320: { model: "Range Rover Sport (old)", years: "2005–2013" },
  L322: { model: "Range Rover (old)", years: "2002–2012" },
  L359: { model: "Freelander 2", years: "2006–2014" },
  L405: { model: "Range Rover (current)", years: "2012–2021" },
  L494: { model: "Range Rover Sport (current)", years: "2013–2022" },
  L462: { model: "Discovery 5", years: "2017–present" },
  L550: { model: "Discovery Sport", years: "2014–present" },
  L538: { model: "Range Rover Evoque (old)", years: "2011–2018" },
  L551: { model: "Range Rover Evoque (new)", years: "2019–present" },
  L560: { model: "Range Rover Velar", years: "2017–present" },
  L663: { model: "Defender (new)", years: "2020–present" },
  X760: { model: "Jaguar XE", years: "2015–present" },
  X260: { model: "Jaguar XF", years: "2015–present" },
};

/**
 * Flat array form of COST_TABLE, used to render the server-rendered /
 * statically-generated SEO table ("Typical UK Engine & System Replacement
 * Costs by Failure Type"). Keeping this derived from COST_TABLE (rather
 * than hand-duplicated) guarantees the crawlable table and the live
 * calculator never drift out of sync.
 */
export const STATIC_TABLE_ROWS = Object.entries(COST_TABLE)
  .filter(([key]) => key !== "unknown")
  .map(([key, entry]) => ({
    key,
    type: entry.label,
    recon: `£${entry.reconditioned.low.toLocaleString("en-GB")}–£${entry.reconditioned.high.toLocaleString("en-GB")}`,
    rebuilt: `£${entry.rebuilt.low.toLocaleString("en-GB")}–£${entry.rebuilt.high.toLocaleString("en-GB")}`,
    used: `£${entry.used.low.toLocaleString("en-GB")}–£${entry.used.high.toLocaleString("en-GB")}`,
    mainDealer: `£${entry.reconditioned.mdLow.toLocaleString("en-GB")}–£${entry.reconditioned.mdHigh.toLocaleString("en-GB")}`,
    emVerified: entry.emVerified,
  }));
