import React from 'react'
import Table from '../global/Table'
import { decisionMatrix } from '@/assets/constant'
import { FaExclamationTriangle } from 'react-icons/fa';
// import { FaExclamationTriangle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineLightBulb } from 'react-icons/hi';



const decisionMatrixColumns = [
    // {
    //     key: "id",
    //     title: "#",
    // },
    {
        key: "model",
        title: "Model",
    },
    {
        key: "engine",
        title: "Engine",
    },
    {
        key: "vehicleValue",
        title: "Typical Vehicle Value",
    },
    {
        key: "replacementCost",
        title: "Replacement Cost",
    },
    {
        key: "verdict",
        title: "Verdict",
        render: (row: any) => {
            const Icon = row.Icon;

            return (
                <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${row.verdictBg} ${row.verdictBorder}`}
                >
                    <Icon className={row.verdictColor} />
                    <span className={`font-medium ${row.verdictColor}`}>
                        {row.verdict}
                    </span>
                </div>
            );
        },
    },
    // {
    //     key: "verdictLine",
    //     title: "Why",
    //     render: (row: any) => (
    //         <span className="text-sm text-gray-300">
    //             {row.verdictLine}
    //         </span>
    //     ),
    // },
];

const DecisionSection = () => {
    return (
        <section className='py-10 bg-[#070E17]'>
            <div className='w-full max-w-3xl mx-auto text-center'>
                <h2 className='text-2xl lg:text-3xl 2xl:text-6xl font-medium lg:font-semibold '>The Ownership Economics Centre</h2>
                <div className=' m-2 h-0.5 w-[95%] bg-linear-to-l from-transparent via-golden to-transparent' />
                <p className='text-base lg:text-lg 2xl:text-xl p-2'> The question every Land Rover owner eventually faces, answered honestly rather than sold around. We tell you when to repair, when to replace, and when to scrap — based on real UK data, not estimates.
                </p>
            </div>


            <div className='max-w-6xl mx-auto pt-6 hidden lg:block'>
                <Table columns={decisionMatrixColumns} data={decisionMatrix} />
                <div className='flex items-center justify-center p-2 border border-golden rounded-lg my-3 gap-4'>
                    <h1 className='flex items-center justify-center gap-1 pr-2 text-lg font-semibold border-r border-golden text-golden '><HiOutlineLightBulb className='text-3xl' /> <span>Rule Of Thumb</span></h1>
                    <p className='text-lg flex-1'>If reconditioned engine cost runs at 60% or more of what your car is actually worth on today's market, get a scrap valuation alongside any repair quote — don't decide on repair cost alone.
                    </p>
                </div>
            </div>

            <div className='lg:hidden pt-6'>
                <div>
                    <div className='flex items-center justify-center p-2 border border-golden rounded-lg my-3 gap-4'>
                        <HiOutlineLightBulb className='text-5xl inset-shadow-2xl inset-shadow-golden text-golden' />
                        <div className=' flex-1'>
                            <h2 className='font-semibold text-lg text-golden'>Rule Of Thumb</h2>
                            <p className='text-[14px]'>If reconditioned engine cost runs at 60% or more of what your car is actually worth on today's market, get a scrap valuation alongside any repair quote — don't decide on repair cost alone.
                            </p>
                        </div>
                    </div>


                    {decisionMatrix.map((d) => (
                        <div className="w-full rounded-lg border border-golden bg-[#08131D] my-1 p-3">
                            <div className="flex items-start gap-3">
                                {/* Image */}
                                <img
                                    src={d.img}
                                    alt=""
                                    className="w-24 h-20 rounded object-cover shrink-0"
                                />

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-white font-semibold text-md">
                                        {d.model} {d.engine}
                                    </h3>

                                    <p className="text-[14px] text-gray-400 mt-1">
                                        Value: {d.vehicleValue}
                                    </p>

                                    <p className="text-[14px] text-gray-400">
                                        Repair Cost: {d.replacementCost}
                                    </p>
                                </div>

                                {/* Right */}
                                <div className="flex flex-col items-end gap-2">
                                    <div className={`flex items-center gap-1 rounded  px-2 py-1 text-[14px] font-semibold ${d.verdictBg} ${d.verdictColor}`}>
                                        <d.Icon className="text-[10px]" />
                                        {d.verdict}
                                    </div>

                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default DecisionSection