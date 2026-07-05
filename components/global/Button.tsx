import Link from 'next/link'
import React from 'react'
import { IconType } from 'react-icons'

interface IProps {
    title?: string,
    href?: string,
    LeftIcon?: IconType,
    RightIcon?: IconType,
    className?: string,
    handleClick?: () => void,
    type?: "button" | "submit" | "reset",
    disabled?: boolean,
    classNameIcon?: string

}

const Button = ({
    title, href, LeftIcon, RightIcon, className, handleClick, type, disabled, classNameIcon
}: IProps) => {
    const content = (
        <button
            type={type}
            disabled={disabled}
            onClick={handleClick}
            className={`${className} group relative overflow-hidden flex items-center justify-center gap-2 py-2 px-2 rounded-md`}
        >
            {LeftIcon && (
                <LeftIcon className={`${classNameIcon} text-white text-lg`} />
            )}

            {title && (
                <p>{title}</p>
            )}

            {RightIcon && (
                <RightIcon className={`${classNameIcon} text-white text-lg`} />
            )}
        </button>
    )
    return href ? <Link href={href}>{content}</Link> : content
}

export default Button