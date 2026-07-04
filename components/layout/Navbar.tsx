'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { FaBars, FaTimes, FaCarSide } from 'react-icons/fa'

const Navbar = () => {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const navbarList = [
        { name: 'Home', path: '/' },
        { name: 'Models', path: '/models' },
        { name: 'Costs', path: '/costs' },
        { name: 'Guide', path: '/guide' },
        { name: 'About', path: '/about' },
        { name: 'Contact', path: '/contact' },
    ]

    return (
        <header className="absolute top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

                {/* Logo */}
                <Link href="/">
                    <img
                        src="/images/land-rover-logo.png"
                        alt="Land Rover"
                        width={120}
                        height={40}
                        className="object-contain"
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center gap-10">
                    {navbarList.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            className={`
                                relative
                                uppercase
                                tracking-wider
                                text-sm
                                font-medium
                                transition-all
                                duration-300
                                hover:text-golden
                                after:absolute
                                after:left-0
                                after:-bottom-1
                                after:h-[2px]
                                after:bg-golden
                                after:transition-all
                                after:duration-300
                                ${pathname === item.path
                                    ? 'text-golden after:w-full'
                                    : 'text-white after:w-0 hover:after:w-full'
                                }
                            `}
                        >
                            {item.name}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Button */}
                <Link
                    href="/garage"
                    className="
                        hidden
                        lg:flex
                        items-center
                        gap-2
                        border-2
                        border-golden
                        px-5
                        py-2.5
                        rounded-md
                        font-semibold
                        hover:bg-yellow-400
                        transition-all
                        duration-300
                        group
                    "
                >
                    <FaCarSide className="text-lg text-golden group-hover:text-white" />
                    My Garage
                </Link>

                {/* Mobile Toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="lg:hidden text-white text-2xl"
                >
                    {open ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden overflow-hidden transition-all duration-300 ${open ? 'max-h-screen' : 'max-h-0'
                    }`}
            >
                <div className="bg-black/95 backdrop-blur-md px-6 py-6 flex flex-col gap-5">

                    {navbarList.map((item) => (
                        <Link
                            key={item.path}
                            href={item.path}
                            onClick={() => setOpen(false)}
                            className={`uppercase tracking-wider text-sm font-medium transition-colors ${pathname === item.path
                                    ? 'text-golden'
                                    : 'text-white hover:text-golden'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}

                    <Link
                        href="/garage"
                        onClick={() => setOpen(false)}
                        className="
                            mt-3
                            flex
                            items-center
                            justify-center
                            gap-2
                            border-2
                            border-golden
                            px-5
                            py-3
                            rounded-md
                            font-semibold
                            hover:bg-yellow-400
                            transition-all
                            duration-300
                            group
                        "
                    >
                        <FaCarSide className="text-golden group-hover:text-white" />
                        My Garage
                    </Link>

                </div>
            </div>
        </header>
    )
}

export default Navbar