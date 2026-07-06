import React from 'react'
import OwnershipTable from '../global/OwnershipTable'
import { FaWrench } from 'react-icons/fa'
import { rankings } from '@/assets/constant'

const OwnershipSection = () => {
    return (
        <section className='  bg-[#070E17]'>
            <div className='container-1'>
                <div className='w-full max-w-3xl mx-auto text-center mb-10'>
                    <h2 className='text-2xl lg:text-3xl 2xl:text-6xl font-medium lg:font-semibold '> Land Rover & Range Rover Ownership Rankings</h2>
                    <div className=' m-2 h-0.5 w-[95%] bg-linear-to-l from-transparent via-golden to-transparent' />
                    <p className='text-sm md:text-base lg:text-lg 2xl:text-xl'>The verdicts people actually want before they read a single spec sheet — the calls we'd make for a friend, backed by real UK enquiry and failure data.
                    </p>
                </div>
                <div className=' hidden lg:block'>
                    <OwnershipTable />
                </div>

                <div className=' lg:hidden'>
                    {rankings.map((r) => (
                        <div className="w-full my-1 rounded-md border border-golden bg-[#08131D] p-3 md:hidden">
                            <div className="flex gap-3">
                                {/* Rank */}
                                <div className="flex flex-col items-center">

                                    <img
                                        src={r.img}
                                        alt=""
                                        className="w-20 h-20 rounded-full border border-golden object-cover"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start gap-2">
                                        <div>
                                            <h4 className="text-golden text-sm font-semibold">
                                                {r.ranking}
                                            </h4>
                                            <h3 className="text-sm font-medium">
                                                {r.winner}
                                            </h3>
                                        </div>

                                        <div className={`flex items-center gap-1 rounded-md  px-2 py-1 whitespace-nowrap ${r.verdictBg}`}>
                                            <r.icon size={12} className={`${r.verdictColor}`} />
                                            <span className={`text-xs font-medium  ${r.verdictColor}`}>
                                                {r.verdict}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="mt-2 text-sm leading-5 text-gray-300">
                                        {r.reason}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>

            </div>
        </section>
    )
}

export default OwnershipSection