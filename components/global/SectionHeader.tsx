import React from 'react'

interface IProps {
    title: string
    des?: string
    className1?: string
    className2?: string
}

const SectionHeader = ({ des, title, className1, className2 }: IProps) => {
    return (
        <div>
            <div className='flex gap-2 items-center justify-center'>
                <div className={`w-16 lg:w-40 2xl:w-60 h-0.5 bg-linear-to-l from-golden to-transparent ${className2}`} />
                <h2 className={`text-2xl lg:text-4xl 2xl:text-6xl font-semibold ${className1}`}>{title}</h2>
                <div className={`w-16 lg:w-40 2xl:w-60 h-0.5 bg-linear-to-r  from-golden to-transparent ${className2}`} />
            </div>
            {des && (
                <p className='text-center pt-2 text-md lg:text-lg 2xl:text-2xl' >{des}</p>
            )}
        </div>
    )
}

export default SectionHeader