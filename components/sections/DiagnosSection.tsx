'use client'
import React, { useState } from 'react'
import LandRoverDiagnosticCalculator from '@/LandRoverDiagnosticCalculator'
import {
    FaChartBar,
    FaWrench,
    FaBook,
    FaTrophy,
    FaClipboardList,
    FaCar,
    FaSearch,
} from "react-icons/fa";
import SectionHeader from '../global/SectionHeader';
import { IoIosArrowForward } from 'react-icons/io';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';


const steps = [
    {
        id: 1,
        icon: FaClipboardList,
        title: "Tell us your symptoms",
        description:
            "Select from common failure categories or use the shortcut grid if you already know the fault.",
    },
    {
        id: 2,
        icon: FaCar,
        title: "Tell us about your vehicle",
        description:
            "Age and estimated value help us calculate whether repair or replacement makes financial sense.",
    },
    {
        id: 3,
        icon: FaSearch,
        title: "Get your diagnosis",
        description:
            "We'll show you the likely fault, OEM part numbers, severity level, and a transparent cost breakdown.",
    },
];

const highlights = [
    {
        id: 1,
        icon: FaChartBar,
        title: "Powered by 9,000+ real UK enquiries",
    },

    {
        id: 3,
        icon: FaBook,
        title: "OEM part references included",
    },
    {
        id: 2,
        icon: FaWrench,
        title: "20+ vetted JLR specialists",
    },
    {
        id: 4,
        icon: FaTrophy,
        title: "Part of Engine Finders",
    },
];
const DiagnosSection = () => {
    const [open, setOpen] = useState(false)
    return (
        <section className=' bg-[#070E17]'>

            <div className='container-1'>
                <div className='w-full max-w-3xl mx-auto text-center mb-10'>
                    <h2 className='text-2xl lg:text-3xl 2xl:text-6xl font-medium lg:font-semibold '>Diagnose Your Land Rover or Range Rover Problem</h2>
                    <div className=' m-2 h-0.5 w-[95%] bg-linear-to-l from-transparent via-golden to-transparent' />
                    <p className='text-sm md:text-base lg:text-lg 2xl:text-xl p-2'>Answer a few questions about your symptoms — we'll match you against 15+ known JLR failure patterns, show you the likely diagnosis, OEM part references, and an honest repair vs. replace cost estimate.
                    </p>
                </div>

                <div className='max-w-6xl my-2 mx-auto flex items-center justify-center flex-wrap gap-3'>
                    {highlights.map((h) => (
                        <div className='flex items-start justify-center gap-2  p-2 rounded-lg border border-golden w-[47%] lg:w-50'>
                            <h.icon className='text-4xl text-golden ' />
                            <h4 className='text-md font-medium'>{h.title}</h4>
                        </div>
                    ))}
                </div>

                <div className='rounded-md border border-golden p-4 max-w-5xl mx-auto mt-10'>
                    <SectionHeader title='How it Works' className2='lg:w-70!' />
                    <div className='flex items-center justify-center lg:justify-between flex-wrap pt-6 gap-2 '>
                        {steps.map((s, i) => (
                            <div className='flex items-center justify-center  gap-2'>
                                <div className='flex flex-col items-center justify-center gap-1 w-65 '>
                                    <span className='bg-golden px-2 py-0 rounded-full text-white text-lg font-semibold mb-2'>{Number(i + 1)}</span>
                                    <s.icon className='text-6xl text-golden ' />
                                    <h5 className='text-lg font-medium text-golden'>{s.title}</h5>
                                    <p className='text-md text-center'> {s.description}</p>
                                </div>
                                {i !== steps.length - 1 && (
                                    <div className='hidden lg:flex flex-col items-center justify-center'>
                                        <div className='h-20 w-0.5 bg-linear-to-t from-golden to-transparent' />
                                        <IoIosArrowForward className='text-golden text-2xl ' />
                                        <div className='h-20 w-0.5 bg-linear-to-b from-golden to-transparent' />
                                    </div>
                                )}

                            </div>
                        ))}


                    </div>

                    {/* Start your diagnose button */}
                    <div className='flex items-center justify-center my-4 mt-8'>
                        <button onClick={() => setOpen(!open)} className='cursor-pointer px-8 p-2 rounded-md border border-golden text-lg font-semibold text-golden leading-8 flex items-center justify-center gap-1'><span>{'Start my diagnose'.toUpperCase()}</span>
                            {open ? <MdKeyboardArrowDown className='' size={25} /> : <MdKeyboardArrowUp size={25} />}
                        </button>
                    </div>
                </div>

                {open && (
                    <div className='rounded-md border border-golden p-4 max-w-5xl mx-auto my-10'>
                        <LandRoverDiagnosticCalculator />
                    </div>
                )}
            </div>

        </section>
    )
}

export default DiagnosSection