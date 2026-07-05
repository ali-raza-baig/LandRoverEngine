
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

