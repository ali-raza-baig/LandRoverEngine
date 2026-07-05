import React from 'react'
import Button from '../global/Button'
import { BiArrowBack, BiArrowFromLeft } from 'react-icons/bi'
import { IconType } from 'react-icons'
import { FaArrowRight } from 'react-icons/fa'

interface IProps {
    img?: string,
    title: string,
    des: string,
    severity?: string,
    Icon?: IconType,
    SeverityClass?: string
}

const FailureCard = ({ img, title, des, severity, Icon, SeverityClass }: IProps) => {
    return (
        <div className='transition-all duration-300 hover:-translate-y-2 p-2 bg-[#0C1A1F] flex flex-col justify-center items-center w-70 lg:w-100 2xl:w-120 rounded-md border border-golden shadow-sm shadow-golden'>
            <div className='flex items-start justify-center gap-2 lg:gap-4'>
                <img src={img} alt="" className='rounded-full border border-golden w-40 h-35' />
                <div>
                    <h4 className='text-xl font-semibold '>{title}</h4>
                    <p className='py-2'>{des}</p>
                </div>
            </div>
            <Button LeftIcon={Icon} title={severity} className={`px-4! bg-red-900/90 ${SeverityClass}`} />
            <Button href='/' RightIcon={FaArrowRight } title='Read More' className='text-golden' classNameIcon='text-golden! text-xl' />
        </div>
    )
}

export default FailureCard