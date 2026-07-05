import React from 'react'

const OwnershipTable = () => {
    return (
        <section className="w-full mt-10">
            <div className="overflow-x-auto rounded-xl border border-golden">
                <table className="min-w-[900px] w-full border-collapse">
                    <thead className="bg-black text-white">
                        <tr>
                            <th className="px-4 py-4 text-left font-semibold border-b border-golden">
                                #
                            </th>
                            <th className="px-4 py-4 text-left font-semibold border-b border-golden">
                                Category
                            </th>
                            <th className="px-4 py-4 text-left font-semibold border-b border-golden">
                                Winner
                            </th>
                            <th className="px-4 py-4 text-left font-semibold border-b border-golden">
                                Why
                            </th>
                            <th className="px-4 py-4 text-left font-semibold border-b border-golden">
                                Verdict
                            </th>
                        </tr>
                    </thead>

                    <tbody className="bg-white">
                        <tr className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-5 border-b border-gray-200 font-semibold">
                                1
                            </td>

                            <td className="px-4 py-5 border-b border-gray-200">
                                Most Reliable Engine
                            </td>

                            <td className="px-4 py-5 border-b border-gray-200 font-semibold text-golden">
                                4.4 SDV8 (508PS)
                            </td>

                            <td className="px-4 py-5 border-b border-gray-200 text-gray-700">
                                Highest replacement cost in the range, but by
                                far the lowest failure rate — oil cooler wear
                                aside, largely trouble-free.
                            </td>

                            <td className="px-4 py-5 border-b border-gray-200 whitespace-nowrap">
                                🏆 Best
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default OwnershipTable