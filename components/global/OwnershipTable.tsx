import React from 'react'
import Table from './Table'
import { rankings } from '@/assets/constant'

export const rankingColumns = [
    {
        key: "id",
        title: "#",
        render: (row: any) => {
            return (
                <span className='text-xl font-bold text-golden'>{row.id}</span>
            )
        }
    },
    {
        key: "ranking",
        title: "Category",
        render: (row: any) => (
            <div className='flex items-center justify-start gap-2'>
                <img src={row.img} alt="" className='w-20 h-20 rounded-full border border-golden' />
                <p className='text-md font-medium text-white'>{row.ranking}</p>
            </div>
        )
    },
    {
        key: "winner",
        title: "Winner",
    },
    {
        key: "reason",
        title: "Why",
        render: (row: any) => (
            <span className="text-gray-300 w-10 text-sm leading-relaxed">
                {row.reason}
            </span>
        ),
    },
    {
        key: "verdict",
        title: "Verdict",
        render: (row: any) => {
            const Icon = row.icon;

            return (
                <div
                    className={`inline-flex items-center gap-2 rounded-md px-3 py-1 ${row.verdictBg}`}
                >
                    <Icon className={row.verdictColor} size={14} />
                    <span className={`font-medium ${row.verdictColor}`}>
                        {row.verdict}
                    </span>
                </div>
            );
        },
    },
];

const OwnershipTable = () => {
    return (
        <div className='max-w-6xl 2xl:max-w-7xl mx-auto'>
            <Table columns={rankingColumns} data={rankings} />
        </div>
    )
}

export default OwnershipTable