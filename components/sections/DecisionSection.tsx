import React from 'react'
import Table from '../global/Table'
import { decisionMatrix } from '@/assets/constant'
import { FaExclamationTriangle } from 'react-icons/fa';
// import { FaExclamationTriangle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";



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
                <h2 className='text-2xl lg:text-3xl 2xl:text-6xl font-medium lg:font-semibold '>Comparison Hub — Head-to-Head Verdicts</h2>
                <div className=' m-2 h-0.5 w-[95%] bg-linear-to-l from-transparent via-golden to-transparent' />
                <p className='text-base lg:text-lg 2xl:text-xl'>The comparisons Land Rover buyers actually want — generation vs generation, engine vs engine, model vs model. Honest, data-backed, and built for real-world decision-making.
                </p>
            </div>


            <div className='max-w-6xl mx-auto pt-6 hidden lg:block'>
                <Table columns={decisionMatrixColumns} data={decisionMatrix} />
            </div>

            <div className='lg:hidden pt-6'>

                <div className="w-full rounded-lg border border-[#2C3E50] bg-[#08131D] p-3">
                    <div className="flex items-start gap-3">
                        {/* Image */}
                        <img
                            src="/images/hero-image.png"
                            alt=""
                            className="w-20 h-14 rounded object-cover flex-shrink-0"
                        />

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-sm">
                                Discovery 4 SDV6
                            </h3>

                            <p className="text-[11px] text-gray-400 mt-1">
                                Value: £6,000 – £18,000
                            </p>

                            <p className="text-[11px] text-gray-400">
                                Repair Cost: £6,500 – £9,500
                            </p>
                        </div>

                        {/* Right */}
                        <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-1 rounded bg-orange-600 px-2 py-1 text-[10px] font-semibold text-white">
                                <FaExclamationTriangle className="text-[10px]" />
                                WATCH
                            </div>

                        </div>
                    </div>

                    {/* Description */}
                    <p className="mt-3 text-xs leading-5 text-gray-300">
                        Sub-£10k examples approach the replacement cost threshold.
                    </p>
                </div>
            </div>
        </section>
    )
}

export default DecisionSection