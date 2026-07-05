import React from 'react'
import { FaWrench } from 'react-icons/fa'
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import FailureAccordianCard from '../cards/FailureAccordianCard'
import { IconType } from 'react-icons';

interface Props {
    title: string;
    cards: any[];
    open: boolean;
    setOpen: () => void;
    Icon?: IconType
}

const FailureAccordian = ({ open, cards, setOpen, title, Icon }: Props) => {
    return (
        <div className='rounded-md border border-golden mb-2'>
            <div onClick={() => setOpen()} className='flex items-center justify-between px-2 border-b border-golden py-4'>
                <div className='flex items-center justify-center gap-2 text-md font-medium'>
                    {Icon && (<Icon className='text-golden text-lg' />)}
                    <span>{title.toUpperCase()}</span>
                </div>

                <div>
                    <span>
                        {open ? <IoIosArrowUp /> : <IoIosArrowDown />}
                    </span>
                </div>
            </div>
            {open && (
                <div>
                    {cards.map((e: any) => (
                        <FailureAccordianCard img={e?.img} title={e.title} des={e.description} severity={e.severity} Icon={e.icon} SeverityClass={e.severityColor} />
                    ))}
                </div>
            )}

        </div>
    )
}

export default FailureAccordian