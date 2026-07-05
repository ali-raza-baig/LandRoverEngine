import {
    FaWrench,
    FaCogs,
    FaRoad,
    FaMountain,
    FaLink,
    FaCheckCircle,
    FaExclamationTriangle,
    FaTimesCircle, FaTrophy, FaUsers
} from "react-icons/fa";

import {

    GiGearHammer,
    GiGearStickPattern,
} from "react-icons/gi";

import { MdOutlineCarRepair } from "react-icons/md";

import {
    BiErrorCircle,
    BiSliderAlt,
    BiWind,
    BiShield,
    BiTransfer,
    BiCog,
    BiGitBranch,
    BiLandscape,
    BiChip,
    BiBattery,
} from "react-icons/bi";



export const engineFailures = [
    {
        id: 1,
        img: "/images/hero-image.png",
        title: "TDV6 Crankshaft Failure",
        description:
            "The 306DT's defining weak point — cold-start knock is the early warning. Catastrophic bearing failure, £6,500–£9,500 reconstruction.",
        severity: "Catastrophic",
        icon: BiShield,
        link: "/engines/306dt/tdv6-crankshaft-failure",
        severityColor: "bg-red-400",
    },
    {
        id: 2,
        img: "/images/hero-image.png",
        title: "276DT Oil Pump Housing Failure",
        description:
            "Often kills the engine outright before any other symptom appears. The 2.7 TDV6's single-point failure.",
        severity: "Catastrophic",
        icon: BiShield,
        link: "/engines/276dt/oil-pump-housing-failure",
        severityColor: "bg-red-400",
    },
    {
        id: 3,
        img: "/images/hero-image.png",
        title: "Ingenium Timing Chain Failure",
        description:
            "Pre-2019 204DTD tensioner wear, significantly improved from 2019 onward. Typical repair cost: £1,200–£2,500.",
        severity: "Monitor",
        icon: BiShield,
        link: "/engines/204dtd/timing-chain-failure",
        severityColor: "bg-yellow-400",
    },
    {
        id: 4,
        img: "/images/hero-image.png",
        title: "508PS Oil Cooler & Dilution Issues",
        description:
            "The 4.4 SDV8's main (and comparatively minor) weak point — oil cooler leaks can lead to coolant ingestion.",
        severity: "Immediate",
        icon: BiShield,
        link: "/engines/508ps/oil-cooler-dilution-issues",
        severityColor: "bg-orange-400",
    },
];

export const suspensionFailures = [
    {
        id: 1,
        img: "/images/hero-image.png",
        title: "Air Suspension Compressor Failure",
        description:
            "The most common air suspension complaint across Range Rover and Discovery. Burnout presents a fire risk.",
        severity: "Catastrophic",
        icon: BiErrorCircle,
        link: "/suspension/air-suspension-compressor-failure",
        severityColor: "bg-red-400",
    },
    {
        id: 2,
        img: "/images/hero-image.png",
        title: "Height Sensor Faults",
        description:
            "Trigger warning lights and uneven ride height well before a full system failure. £200–£500 repair cost.",
        severity: "Low",
        icon: BiSliderAlt,
        link: "/suspension/height-sensor-faults",
        severityColor: "bg-green-400",
    },
    {
        id: 3,
        img: "/images/hero-image.png",
        title: "Valve Block & Air Spring Leaks",
        description:
            "Slow leaks that are often mistaken for compressor failure. £300–£800 repair cost.",
        severity: "Low",
        icon: BiWind,
        link: "/suspension/valve-block-air-spring-leaks",
        severityColor: "bg-green-400",
    },
];

export const drivetrainFailures = [
    {
        id: 1,
        img: "/images/hero-image.png",
        title: "Transfer Box Faults",
        description:
            "Loss of drive or grinding noises on 4x4 engagement. ATC300/400 chain stretch is the most common cause.",
        severity: "Monitor",
        // icon: BiTransfer,
        link: "/drivetrain/transfer-box-faults",
        severityColor: "bg-yellow-400",
    },
    {
        id: 2,
        img: "/images/hero-image.png",
        title: "Differential Wear",
        description:
            "Front and rear diff whine, most common on high-mileage Discovery and Defender. £800–£1,500 repair.",
        severity: "Monitor",
        icon: BiCog,
        link: "/drivetrain/differential-wear",
        severityColor: "bg-yellow-400",
    },
    {
        id: 3,
        img: "/images/hero-image.png",
        title: "Propshaft & UJ Failures",
        description:
            "Vibration under load, a common MOT advisory across the range. £200–£500 repair.",
        severity: "Low",
        icon: BiGitBranch,
        link: "/drivetrain/propshaft-uj-failures",
        severityColor: "bg-green-400",
    },
];


export const electricalFailures = [
    {
        id: 1,
        img: "/images/hero-image.png",
        title: "Terrain Response System Faults",
        description:
            "Sensor and module failures that disable off-road drive modes. Often linked to transfer case issues.",
        severity: "Monitor",
        // icon: BiLandscape,
        link: "/electrical/terrain-response-system-faults",
        severityColor: "bg-yellow-400",
    },
    {
        id: 2,
        img: "/images/hero-image.png",
        title: "Infotainment & Software Glitches",
        description:
            "Particularly common on pre-2018 Touch Pro systems. Can be resolved with software updates.",
        severity: "Low",
        icon: BiChip,
        link: "/electrical/infotainment-software-glitches",
        severityColor: "bg-green-400",
    },
    {
        id: 3,
        img: "/images/hero-image.png",
        title: "Battery Drain / Parasitic Drain",
        description:
            "Modules failing to sleep correctly — a frequent no-start complaint on stop-start models.",
        severity: "Low",
        icon: BiBattery,
        link: "/electrical/battery-drain-parasitic-drain",
        severityColor: "bg-green-400",
    },
];


export const knowledgeCentre = [
    {
        id: 1,
        title: "TDV6 Knowledge Centre",
        description:
            "Every variant, every failure, every generation it was fitted to — the 2.7 and 3.0 TDV6/SDV6 complete guide.",
        Icon: FaWrench,
    },
    {
        id: 2,
        title: "SDV6 Knowledge Centre",
        description:
            "The 3.0 V6 diesel's full ownership profile — performance, reliability, and known issues.",
        Icon: FaCogs,
    },
    {
        id: 3,
        title: "Ingenium Knowledge Centre",
        description:
            "Petrol vs diesel reliability, pre- and post-2019 changes, and what to look for when buying.",
        Icon: FaLink,
    },
    {
        id: 4,
        title: "SDV8 Knowledge Centre",
        description:
            "The 4.4 V8 diesel's reliability record and running costs — the most durable engine in the range.",
        Icon: FaMountain,
    },
    {
        id: 5,
        title: "Air Suspension Knowledge Centre",
        description:
            "Common faults, compressor failure, replacement costs, and how to diagnose EAS issues.",
        Icon: MdOutlineCarRepair,
    },
    {
        id: 6,
        title: "Terrain Response Systems",
        description:
            "What goes wrong, what it costs to fix, and how to maintain JLR's advanced 4x4 system.",
        Icon: FaRoad,
    },
    {
        id: 7,
        title: "ZF Gearbox Problems",
        description:
            "The 8-speed automatic's known issues across JLR's range — mechatronic, torque converter, and more.",
        Icon: GiGearStickPattern,
    },
    {
        id: 8,
        title: "Transfer Box & Differential Problems",
        description:
            "4x4 system faults by model and generation — ATC300/400 chain stretch, diff whine, and UJ failures.",
        Icon: GiGearHammer,
    },
];

export const comparisons = [
    {
        id: 1,
        left: "Discovery 4",
        right: "Discovery 5",
        question: "Which generation should you buy?",
        verdict:
            "Compare reliability, running costs, ownership experience, and long-term value.",
    },
    {
        id: 2,
        left: "L405 Range Rover",
        right: "L460 Range Rover",
        question: "Is the extra outlay worth it?",
        verdict:
            "Compare ownership costs, reliability, technology, and resale value.",
    },
    {
        id: 3,
        left: "TDV6",
        right: "SDV6",
        question: "What's the real difference?",
        verdict:
            "Compare performance, reliability, maintenance requirements, and replacement costs side-by-side.",
    },
    {
        id: 4,
        left: "Ingenium",
        right: "TDV6",
        question: "Which engine should you buy?",
        verdict:
            "Compare fuel economy, reliability, maintenance, and long-term ownership costs.",
    },
    {
        id: 5,
        left: "Defender",
        right: "Discovery",
        question: "Which is the better everyday SUV?",
        verdict:
            "Compare practicality, interior space, off-road capability, running costs, and daily usability.",
    },
    {
        id: 6,
        left: "Range Rover Sport",
        right: "Discovery",
        question: "Which offers better value for money?",
        verdict:
            "Compare ownership costs, depreciation, maintenance, and overall value over 3–5 years.",
    },
];


export const decisionMatrix = [
    {
        id: 1,
        model: "Discovery 4",
        engine: "SDV6",
        img: "/images/hero-image.png",
        vehicleValue: "£6,000–£18,000",
        replacementCost: "£6,500–£9,500",
        verdict: "Watch",
        verdictLine:
            "Sub-£10k examples approach the replacement cost threshold.",
        verdictColor: "text-yellow-400",
        verdictBg: "bg-yellow-500/10",
        verdictBorder: "border-yellow-500/30",
        Icon: FaExclamationTriangle,
    },
    {
        id: 2,
        model: "Freelander 2",
        engine: "204DTD",
        img: "/images/vehicles/freelander-2.webp",
        vehicleValue: "£2,500–£7,000",
        replacementCost: "£3,500–£5,800",
        verdict: "Threshold",
        verdictLine:
            "Reconditioned engine cost frequently exceeds the vehicle's value.",
        verdictColor: "text-red-500",
        verdictBg: "bg-red-500/10",
        verdictBorder: "border-red-500/30",
        Icon: FaTimesCircle,
    },
    {
        id: 3,
        model: "Range Rover Sport L494",
        engine: "Various",
        img: "/images/vehicles/range-rover-sport-l494.webp",
        vehicleValue: "£12,000–£55,000",
        replacementCost: "£5,000–£12,000",
        verdict: "Safe",
        verdictLine:
            "Engine replacement remains financially viable across most examples.",
        verdictColor: "text-green-500",
        verdictBg: "bg-green-500/10",
        verdictBorder: "border-green-500/30",
        Icon: FaCheckCircle,
    },
    {
        id: 4,
        model: "Range Rover L405",
        engine: "Various",
        img: "/images/vehicles/range-rover-l405.webp",
        vehicleValue: "£14,000–£55,000",
        replacementCost: "£6,500–£12,000",
        verdict: "Safe",
        verdictLine:
            "Replacement cost is comfortably below typical market value.",
        verdictColor: "text-green-500",
        verdictBg: "bg-green-500/10",
        verdictBorder: "border-green-500/30",
        Icon: FaCheckCircle,
    },
    {
        id: 5,
        model: "Defender L663",
        engine: "Various",
        img: "/images/vehicles/defender-l663.webp",
        vehicleValue: "£35,000–£90,000",
        replacementCost: "£3,500–£9,500",
        verdict: "Safe",
        verdictLine:
            "Very safe investment across all engine and trim variants.",
        verdictColor: "text-green-500",
        verdictBg: "bg-green-500/10",
        verdictBorder: "border-green-500/30",
        Icon: FaCheckCircle,
    },
    {
        id: 6,
        model: "Range Rover Sport L320",
        engine: "368DT",
        img: "/images/vehicles/range-rover-sport-l320.webp",
        vehicleValue: "£5,000–£15,000",
        replacementCost: "£5,500–£8,000",
        verdict: "Watch",
        verdictLine:
            "Older examples often sit at 40–60% of replacement cost.",
        verdictColor: "text-yellow-400",
        verdictBg: "bg-yellow-500/10",
        verdictBorder: "border-yellow-500/30",
        Icon: FaExclamationTriangle,
    },
];



export const rankings = [
    {
        id: 1,
        ranking: "Most Reliable Engine",
        winner: "4.4 SDV8 (508PS)",
        img: "/images/hero-image.png",
        reason:
            "Highest replacement cost in the range, but by far the lowest failure rate — oil cooler wear aside, largely trouble-free.",
        verdict: "Best",
        icon: FaTrophy,
        verdictColor: "text-green-400",
        verdictBg: "bg-green-500/10",
    },
    {
        id: 2,
        ranking: "Most Reliable Model",
        winner: "Discovery 5",
        img: "/images/rankings/discovery-5.webp",
        reason:
            "Revised post-2019 Ingenium engines and a lighter aluminium platform give it the strongest all-round ownership profile.",
        verdict: "Best",
        icon: FaTrophy,
        verdictColor: "text-green-400",
        verdictBg: "bg-green-500/10",
    },
    {
        id: 3,
        ranking: "Best Used Buy",
        winner: "Discovery 4 (SDV6)",
        img: "/images/rankings/discovery-4-sdv6.webp",
        reason:
            "Genuinely capable when the oil-interval history is proven — the discipline matters more than the mileage.",
        verdict: "Safe",
        icon: FaCheckCircle,
        verdictColor: "text-emerald-400",
        verdictBg: "bg-emerald-500/10",
    },
    {
        id: 4,
        ranking: "Most Expensive Failure",
        winner: "306DT (TDV6/SDV6) Crank Failure",
        img: "/images/rankings/306dt-crank-failure.webp",
        reason:
            "Catastrophic bearing failure, £6,500–£9,500 full recon, and largely unrepairable once it starts.",
        verdict: "Avoid",
        icon: FaTimesCircle,
        verdictColor: "text-red-400",
        verdictBg: "bg-red-500/10",
    },
    {
        id: 5,
        ranking: "Safest Range Rover to Buy",
        winner: "L405 (2012–2021)",
        img: "/images/rankings/range-rover-l405.webp",
        reason:
            "Typical values of £14,000–£55,000 against £6,500–£12,000 recon cost — comfortably safe across almost every example.",
        verdict: "Safe",
        icon: FaCheckCircle,
        verdictColor: "text-emerald-400",
        verdictBg: "bg-emerald-500/10",
    },
    {
        id: 6,
        ranking: "Highest Risk Purchase",
        winner: "Early Evoque L538 (pre-2019, 204DTD)",
        img: "/images/rankings/evoque-l538.webp",
        reason:
            "Timing chain tensioner risk sits on an ageing, lower-value host — the combination that flags 'Watch' most often.",
        verdict: "Watch",
        icon: FaExclamationTriangle,
        verdictColor: "text-yellow-400",
        verdictBg: "bg-yellow-500/10",
    },
    {
        id: 7,
        ranking: "Best Family Land Rover",
        winner: "Discovery 5",
        img: "/images/rankings/discovery-5.webp",
        reason:
            "Seven seats, the more dependable revised Ingenium range, and the best-supported specialist network.",
        verdict: "Best",
        icon: FaUsers,
        verdictColor: "text-blue-400",
        verdictBg: "bg-blue-500/10",
    },
    {
        id: 8,
        ranking: "Best Long-Term Keeper",
        winner: "Defender L663",
        img: "/images/rankings/defender-l663.webp",
        reason:
            "High host value across both engines fitted means replacement is comfortably 'Safe' at almost any spec.",
        verdict: "Best",
        icon: FaTrophy,
        verdictColor: "text-green-400",
        verdictBg: "bg-green-500/10",
    },
];