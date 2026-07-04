import React from 'react'
import SectionHeader from '../global/SectionHeader'
import VehicleCard from '../cards/VehicleCard'

const BestVehicleSection = () => {
    return (
        <section className='mt-10'>
            <SectionHeader des=' Choose your model to explore reliability, common faults and real running costs.' title='Find Your Vehicle' />

            <div className='relative flex flex-row items-center justify-center gap-2 mt-10 h-full '>
                <div className='w-[47%] flex flex-col justify-center items-center'>
                    <SectionHeader title='Land Rover' className1='text-md lg:text-2xl!' />
                    <div className='grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-2  gap-2 lg:gap-4 mt-6'>
                        <VehicleCard />
                        <VehicleCard />
                        <VehicleCard />
                        <VehicleCard />
                    </div>
                </div>
                <div className=" absolute left-1/2 top-12 lg:top-8 bottom-0 lg:bottom-4 w-0.5 -translate-x-1/2 bg-golden" />
                <div className='w-[47%] flex flex-col justify-center items-center'>
                    <SectionHeader title='Range Rover' className1='text-md lg:text-2xl!' />
                    <div className='grid grid-cols-1 grid-rows-1 lg:grid-cols-2 lg:grid-rows-2 gap-2 lg:gap-4 mt-6'>
                        <VehicleCard />
                        <VehicleCard />
                        <VehicleCard />
                        <VehicleCard />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BestVehicleSection
