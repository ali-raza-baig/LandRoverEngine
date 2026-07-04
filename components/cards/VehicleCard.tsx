import React from 'react'
import { FaTrophy } from 'react-icons/fa'

const VehicleCard = () => {
    return (
        <div className='relative w-45 h-40 lg:w-70 lg:h-60 rounded-md border border-golden p-1 '>
            <div className='flex gap-2 items-center justify-center bg-golden text-white absolute top-2 right-2 p-2 rounded-full'>
                <FaTrophy className='text-white' size={20} />
                <p className='text-md font-medium'>Safest Buy</p>
            </div>
            <img src="/images/hero-image.png" className='rounded-md w-45 h-37 lg:w-70 lg:h-57' alt="" />
            <div className='bg-linear-to-t from-black from-45% via-black/65 via-65% to-transparent to-100% rounded-b-md text-white absolute bottom-0 left-0 w-full'>
                <div className='flex flex-col gap-1 justify-center p-1 lg:p-4  '>
                    <p className='text-lg font-medium'>Defender</p>
                    <p className='text-sm font-medium'>5 Genrations</p>
                </div>
            </div>
        </div>
    )
}

export default VehicleCard