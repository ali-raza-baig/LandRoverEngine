import React from 'react'
import SectionHeader from '../global/SectionHeader'
import VehicleCard from '../cards/VehicleCard'
import { FaArrowRight, FaTrophy, FaUsers } from 'react-icons/fa'

const BestVehicleSection = () => {
    return (
        <>
            <section className=''>
                <div className='container-1'>
                    <SectionHeader className1='text-' des=' Choose your model to explore reliability, common faults and real running costs.' title='Find Your Vehicle' />

                    <div className='relative flex flex-row items-center justify-between gap-2 my-6 lg:my-10 h-full '>
                        <div className='w-[47%] flex flex-col justify-center items-center'>
                            <SectionHeader title='Land Rover' className1='text-base! lg:text-2xl! font-medium!' className2=' w-8! lg:w-40!' />
                            <div className='grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-2  gap-2 lg:gap-4 mt-6'>
                                <VehicleCard IconBadge={FaTrophy} badgeText='Safest Buy' img='/images/hero-image.png' name='Defender' gen='5 Genrations' />
                                <VehicleCard IconBadge={FaTrophy} badgeText='Safest Buy' img='https://enginefinders.co.uk/asset/img/land-rover-discovery-hero.webp' name='Defender' gen='5 Genrations' />
                                <VehicleCard IconBadge={FaTrophy} badgeText='Safest Buy' img='https://enginefinders.co.uk/asset/img/range-rover-hero-ll.webp' name='Defender' gen='5 Genrations' />
                                <VehicleCard IconBadge={FaTrophy} badgeText='Safest Buy' img='https://enginefinders.co.uk/asset/img/land-rover-discovery-hero.webp' name='Defender' gen='5 Genrations' />
                            </div>
                        </div>
                        <div className="hidden lg:block absolute left-1/2 top-12 lg:top-8 bottom-0 lg:bottom-4 w-0.5 -translate-x-1/2 bg-golden" />
                        <div className='w-[47%] flex flex-col justify-center items-center'>
                            <SectionHeader title='Range Rover' className1='text-base! lg:text-2xl! font-medium!' className2=' w-8! lg:w-40!' />
                            <div className='grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-2 gap-2 lg:gap-4 mt-6'>
                                <VehicleCard IconBadge={FaTrophy} badgeText='Safest Buy' img='https://enginefinders.co.uk/asset/img/range-rover-mainline-hero.webp' name='Defender' gen='5 Genrations' />
                                <VehicleCard IconBadge={FaTrophy} badgeText='Safest Buy' img='https://enginefinders.co.uk/asset/img/range-rover-evoque-hero.webp' name='Defender' gen='5 Genrations' />
                                <VehicleCard IconBadge={FaTrophy} badgeText='Safest Buy' img='/images/hero-image.png' name='Defender' gen='5 Genrations' />
                                <VehicleCard IconBadge={FaTrophy} badgeText='Safest Buy' img='https://enginefinders.co.uk/asset/img/range-rover-velar-hero.webp' name='Defender' gen='5 Genrations' />
                            </div>
                        </div>
                    </div>

                    <div className='max-w-5xl mb-10 w-[97%] mx-auto mt-4 flex flex-col lg:flex-row gap-2 text-center lg:text-start items-center justify-evenly p-4 rounded-md border border-golden'>
                        <FaUsers className='text-golden text-8xl' />
                        <div className='w-full lg:w-[47%]'>
                            <h3 className='text-xl font-semibold'>Not sure which engine or model right for you?</h3>
                            <p className='text-sm md:text-base leading-relaxed '>Our data, tools and specialists can help you make right decission with confidence</p>
                        </div>
                        <button className='py-2 px-4 rounded-md border border-golden flex items-center justify-center gap-2 text-lg font-medium group hover:bg-golden'>Get Expert Guidance <FaArrowRight className='text-golden text-lg group-hover:text-white' /></button>
                    </div>

                </div>
            </section>

        </>
    )
}

export default BestVehicleSection
