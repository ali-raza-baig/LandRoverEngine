import React from 'react'
import { AiOutlineSafetyCertificate } from 'react-icons/ai'
import { CiStar } from 'react-icons/ci'
import { FaRegCheckCircle, FaStar, FaWrench } from 'react-icons/fa'
import { FaUserGroup } from 'react-icons/fa6'
import { GiHistogram } from 'react-icons/gi'
import { LuMessageSquareMore } from 'react-icons/lu'

const HomeHeroSection = () => {
    const trustStrip = [
        { icon: LuMessageSquareMore, text: '9,000+ Real Enquiries' },
        { icon: FaUserGroup, text: '20+ Vetted JLR Specialists' },
        { icon: AiOutlineSafetyCertificate, text: 'Every Generation, Honestly Rated' },
        { icon: CiStar, text: 'Part of Engine Finders' },
    ]

    const trustBadges = [
        { icon: FaRegCheckCircle, text: 'Genuine failure data from thousands of UK owners' },
        { icon: FaStar, text: '100% independent. No sponsors. No bias.' },
        { icon: GiHistogram, text: ' Honest repair vs replace economics' },
        { icon: FaWrench, text: 'Expertly verified by 20+ vetted JLR specialists' },
    ]
    return (
        <>
            <section className="relative min-h-screen overflow-hidden border-b border-golden">

                {/* Background Image */}
                <img
                    src="/images/hero-image.png"
                    alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,black_25%,rgba(0,45,34,0.3)_70%,transparent_100%)]" />

                {/* Content */}
                <div className="relative z-10 flex flex-col h-full justify-center">
                    <div className="w-full lg:max-w-2xl 2xl:max-w-6xl mt-28 xl:mt-30 2xl:mt-50 px-6 md:px-10 lg:px-14 2xl:px-30 text-white">
                        <h1 className="text-3xl md:text-5xl lg:text-6xl 2xl:text-9xl font-semibold">
                            The UK's Most Trusted Land Rover & Range Rover Ownership Guide
                        </h1>

                        <p className="mt-6 max-w-xl text-md lg:text-xl 2xl:text-2xl text-gray-200">
                            Reliability rankings, real failure data, honest repair-vs-replace economics — for every Defender, Discovery, Range Rover, Evoque, Velar and Freelander ever sold in the UK.

                        </p>
                    </div>
                    <div className='px-4 lg:px-14 2xl:px-30 mt-10  flex flex-wrap gap-4 pb-2'>
                        {trustStrip.map((t, i) => (
                            <div className={` flex flex-col lg:flex-row gap-2 w-[41%] lg:w-40 ${i === trustStrip.length - 1 ? 'border-r border-golden lg:border-0' : 'border-r border-golden'}`}>
                                <t.icon className='text-golden text-2xl' size={35} />
                                <p>{t.text}</p>
                            </div>
                        ))}

                    </div>
                </div>

            </section>

            <div className='m-1 mt-4 lg:mt-6 lg:m-4 flex items-center justify-center flex-wrap gap-4'>
                {trustBadges.map((t) => (
                    <div className='flex flex-col lg:flex-row gap-3 rounded-md border border-golden w-[47%] lg:w-[20%] p-4'>
                        <t.icon className='text-golden' size={40} />
                        <p>{t.text}</p>
                    </div>
                ))}

            </div>
        </>
    )
}

export default HomeHeroSection