'use client'
import React, { useState } from 'react'
import DatabaseCard from '../cards/DatabaseCard'
import { drivetrainFailures, electricalFailures, engineFailures, suspensionFailures } from '@/assets/constant'
import { FaWrench } from 'react-icons/fa'
import FailureCard from '../cards/FailureCard'
import FailureAccordian from '../global/FailureAccordian'


const failureSections = [
    {
        title: 'Engine Failures',
        cards: engineFailures,
    },
    {
        title: 'Suspension Failures',
        cards: suspensionFailures,
    },
    {
        title: 'Drivetrain Failures',
        cards: drivetrainFailures,
    },
    {
        title: 'Electrical Failures',
        cards: electricalFailures,
    },
];

const DatabaseSection = () => {
    const [openSections, setOpenSections] = useState<number[]>([0]);
    return (
        
            <section className='py-10  bg-[#070E17]'>
                <div className='w-full max-w-3xl mx-auto text-center'>
                    <h2 className='text-2xl lg:text-3xl 2xl:text-6xl font-medium lg:font-semibold '>The Land Rover & Range Rover Failure Database</h2>
                    <div className=' m-2 h-0.5 w-[95%] bg-linear-to-l from-transparent via-golden to-transparent' />
                    <p className='text-base lg:text-lg 2xl:text-xl'>A permanent, categorised reference — not symptom-chasing blog posts. Every entry links to a full breakdown of symptoms, root cause, mileage window, repair cost, and replacement cost.</p>
                </div>

                <div className='hidden lg:block'>
                    <div className='my-6 flex flex-col justify-center'>

                        <h3 className='lg:pl-20 2xl:pl-100 py-2 mb-2 flex items-center gap-2 font-bold text-2xl' >
                            <FaWrench className='text-golden  ' />
                            {'Engine Failures'.toUpperCase()}</h3>

                        <div className='flex flex-wrap justify-center  gap-4 '>
                            {engineFailures.map((e) => (
                                <DatabaseCard img={e?.img} title={e.title} des={e.description} severity={e.severity} Icon={e.icon} SeverityClass={e.severityColor} />
                            ))}
                        </div>
                    </div>

                    <div className='my-6 flex flex-col justify-center'>

                        <h3 className='lg:pl-20 2xl:pl-100 py-2 mb-2 flex items-center gap-2 font-bold text-2xl' >
                            <FaWrench className='text-golden  ' />
                            {'Suspension Failures'.toUpperCase()}</h3>

                        <div className='flex flex-wrap justify-center  gap-4 '>
                            {suspensionFailures.map((e) => (
                                <FailureCard img={e?.img} title={e.title} des={e.description} severity={e.severity} Icon={e.icon} SeverityClass={e.severityColor} />
                            ))}
                        </div>
                    </div>

                    <div className='my-6 flex flex-col justify-center'>

                        <h3 className='lg:pl-20 2xl:pl-100 py-2 mb-2 flex items-center gap-2 font-bold text-2xl' >
                            <FaWrench className='text-golden  ' />
                            {'Drivetrain Failures'.toUpperCase()}</h3>

                        <div className='flex flex-wrap justify-center  gap-4 '>
                            {drivetrainFailures.map((e) => (
                                <FailureCard img={e?.img} title={e.title} des={e.description} severity={e.severity} Icon={e.icon} SeverityClass={e.severityColor} />
                            ))}
                        </div>
                    </div>

                    <div className='my-6 flex flex-col justify-center'>

                        <h3 className='lg:pl-20 2xl:pl-100 py-2 mb-2 flex items-center gap-2 font-bold text-2xl' >
                            <FaWrench className='text-golden  ' />
                            {'Electrical Failures'.toUpperCase()}</h3>

                        <div className='flex flex-wrap justify-center  gap-4 '>
                            {electricalFailures.map((e) => (
                                <FailureCard img={e?.img} title={e.title} des={e.description} severity={e.severity} Icon={e.icon} SeverityClass={e.severityColor} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:hidden  mx-2 space-y-4">
                    {failureSections.map((section, index) => (
                        <FailureAccordian
                            key={section.title}
                            title={section.title}
                            cards={section.cards}
                            open={openSections.includes(index)}
                            setOpen={() =>
                                setOpenSections((prev) =>
                                    prev.includes(index)
                                        ? prev.filter((i) => i !== index)
                                        : [...prev, index]
                                )
                            }
                        />
                    ))}
                </div>

            </section>
       
    )
}

export default DatabaseSection