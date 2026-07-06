import { comparisons } from '@/assets/constant'
import Link from 'next/link'
import React from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'

const ComparisonSection = () => {
    return (
        <section className='lg:py-6 bg-[#070E17]'>
            <div className='container-1'>
                <div className='w-full max-w-3xl mx-auto text-center'>
                    <h2 className='text-2xl lg:text-3xl 2xl:text-6xl font-medium lg:font-semibold '>Comparison Hub — Head-to-Head Verdicts</h2>
                    <div className=' m-2 h-0.5 w-[95%] bg-linear-to-l from-transparent via-golden to-transparent' />
                    <p className='text-base lg:text-lg 2xl:text-xl p-2'>The comparisons Land Rover buyers actually want — generation vs generation, engine vs engine, model vs model. Honest, data-backed, and built for real-world decision-making.
                    </p>
                </div>

                <div className='max-w-7xl mx-auto pt-10 grid grid-cols-1 grid-rows-1 lg:grid-cols-3 lg:grid-rows-2 place-items-center gap-4'>

                    {comparisons.map((c) => (
                        <div key={c.id} className=' rounded-lg border border-golden shadow shadow-golden transition-all duration-300 hover:-translate-y-1.5 col-span-1 w-[97%] p-4 flex flex-col items-center gap-4'>
                            <div className='pb-4 inline text-sm lg:text-lg font-semibold border-b-[0.5px] border-golden'>
                                <span>{c.left}</span>
                                <span className='p-2 rounded-full border border-golden inset-shadow-sm inset-shadow-golden m-2 text-golden!'>VS</span>
                                <span>{c.right}</span>
                            </div>
                            <div>
                                <h3 className='text-center text-lg lg:text-xl font-medium text-golden'>{c.question}</h3>
                                <p className='text-center text-base lg:text-lg'>{c.verdict}</p>
                                <Link href={'/'} className='pt-2 group text-golden text-md lg:text-xl flex items-center justify-center gap-1'> <span>Explore</span> <FaArrowRightLong className='transition-all duration-200 group-hover:translate-x-1 pt-0.5' /> </Link>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </section>
    )
}

export default ComparisonSection