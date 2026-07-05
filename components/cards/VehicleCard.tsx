import React from 'react'
import { IconType } from 'react-icons'
import { FaTrophy } from 'react-icons/fa'

interface IProps {
    img: string,
    IconBadge: IconType,
    badgeText: string,
    name: string,
    gen?: string,
    alt?: string
}

const VehicleCard = ({ img, IconBadge, badgeText, name, gen, alt }: IProps) => {
    return (
        <div className='relative w-43 h-45 lg:w-70 lg:h-60 2xl:w-120 2xl:h-120 rounded-md border border-golden p-1 '>
            <div className='flex gap-1 lg:gap-2 items-center justify-center bg-golden text-white absolute top-1 right-1 lg:top-2 lg:right-2 p-1 lg:p-2 rounded-full'>
                <IconBadge className='text-white text-md lg:text-xl' />
                <p className='text-base lg:text-md lg:font-medium'>{badgeText}</p>
            </div>
            <img src={img} className='rounded-md w-43 h-42 lg:w-70 lg:h-57 2xl:w-120 2xl:h-118' alt={alt} />
            <div className='bg-linear-to-t from-black from-45% via-black/65 via-65% to-transparent to-100% rounded-b-md text-white absolute bottom-0 left-0 w-full'>
                <div className='flex flex-col gap-1 justify-center p-1 lg:p-4  '>
                    <p className='text-lg font-medium'>{name}</p>
                    <p className='text-sm font-medium'>{gen}</p>
                </div>
            </div>
        </div>
    )
}

export default VehicleCard