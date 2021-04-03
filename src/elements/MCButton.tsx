import React from 'react';
import { openURL } from '../../lib/utils'

const MCButton = (props: { 
    text: string, 
    isMinecraft?: boolean, 
    link?: string, 
    onClick?: Function, 
    className?: string ,
    type?: 'button' | 'submit' | 'reset' | undefined
}) => {
    const isMinecraft = props.isMinecraft || false
    const link = props.link
    const text = props.text
    const onClick = props.onClick
    const className = props.className
    const type = props.type

    const buttonClass: string = `${isMinecraft ? 'minecraft ' : ''}text-white bg-button w-32 shadow-2xl hover:bg-button active:bg-button duration-300 hover:shadow-xl focus:outline-none focus:shadow ${className ? className : ''}`

    return (
        <button type={type} className={buttonClass} onClick={onClick ? () => onClick() : () => link ? openURL(link) : undefined}>
            <p className="mb-2">{text}</p>
        </button>
    )
}

export default MCButton