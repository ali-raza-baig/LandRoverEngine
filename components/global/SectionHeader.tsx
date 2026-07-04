import React from 'react'

interface IProps {
    title: string
    des?: string
    className1?: string
}

const SectionHeader = ({ des, title, className1 }: IProps) => {
    return (
        <div>
            <div className='flex gap-2 items-center justify-center'>
                <div className="w-16 lg:w-40 h-0.5 bg-linear-to-l from-golden to-transparent" />
                <h2 className={`text-2xl lg:text-4xl font-semibold ${className1}`}>{title}</h2>
                <div className='w-16 lg:w-40 h-0.5 bg-linear-to-r  from-golden to-transparent' />
            </div>
            {des && (
                <p className='text-center pt-2' >{des}</p>
            )}
        </div>
    )
}

export default SectionHeader