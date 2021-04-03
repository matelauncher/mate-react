import React from 'react'

const TopButton = (props: { onClick: Function, imgSrc: string, text?: string, className?: string }) => {
    const onClick = props.onClick
    const imgSrc = props.imgSrc
    const text = props.text
    const className = props.className

    return (
        <button onClick={() => onClick()} className={`flex flex-row  text-white p-2 pt-1 pb-1 focus:outline-none transition-all duration-300 hover:bg-mc-b100 h-8 ${className ? className : ''}`}>
            <img src={imgSrc} alt="" className="w-6 h-6" />
            { text ? <p className="ml-2">{text}</p> : null }
        </button>
    )
}

export default TopButton