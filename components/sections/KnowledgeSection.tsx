import { knowledgeCentre } from '@/assets/constant'
import Link from 'next/link'
import React from 'react'
import { FaLongArrowAltRight, FaWrench } from 'react-icons/fa'
import { FaArrowRightLong } from 'react-icons/fa6'

const KnowledgeSection = () => {
    return (
        <section className='bg-[#070E17] '>
            <div className='container-1'>
                <div className='w-full max-w-3xl mx-auto text-center'>
                    <h2 className='text-2xl lg:text-3xl 2xl:text-6xl font-medium lg:font-semibold '>Knowledge Centres</h2>
                    <div className=' m-2 h-0.5 w-[95%] bg-linear-to-l from-transparent via-golden to-transparent' />
                    <p className='text-sm md:text-base lg:text-lg 2xl:text-xl'>Deep, permanent reference hubs for the engines and systems Land Rover owners research most — not blog posts, not one-off articles. Every guide is built on real UK enquiry data and JLR-specific expertise.
                    </p>
                </div>

                <div className='flex items-center justify-center gap-4 flex-wrap mt-10'>

                    {knowledgeCentre.map((k, i) => (
                        <div key={i} className='lg:h-80 rounded-lg border border-golden shadow shadow-golden transition-all duration-300 hover:-translate-y-1.5 w-[97%] lg:w-[20%] p-4 flex flex-col items-center gap-4'>
                            <div className='flex flex-col items-center justify-center gap-2'>
                                <k.Icon className='text-golden text-7xl' />
                                <h3 className='text-xl font-semibold text-center'>{k.title}</h3>
                            </div>
                            <div className='flex flex-col items-center justify-center'>
                                <p className='text-base lg:text-md text-center'>{k.description}</p>
                                <Link href={'/'} className='pt-2 group text-golden text-md lg:text-xl flex items-center justify-center gap-1'> <span>Explore</span> <FaArrowRightLong className='transition-all duration-200 group-hover:translate-x-1 pt-0.5' /> </Link>
                            </div>
                        </div>
                    ))}


                </div>
            </div>
        </section>
    )
}

export default KnowledgeSection