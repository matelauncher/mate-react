import React from 'react'

const Popup = (props: { name: string, msg: string, isActive: boolean, setActive: Function }) => {
    const name = props.name
    const msg = props.msg
    const isActive = props.isActive
    const setActive = props.setActive

    return (
        <>{
            isActive ?
            <div className="z-30 absolute h-full w-full overflow-hidden">
                <div className="h-full w-full flex">
                <div className="mt-8 absolute h-full w-full flex items-center justify-center flex-col">
                    <div className="bg-blk-300 w-3/6 h-64 rounded-lg text-white flex">
                    <div className="p-2">
                        <p className="text-xl leading-tight mb-2 font-semibold">{name}</p>
                        <div className="">{msg}</div>
                    </div>
                    </div>
                </div>
                </div>
                <div onClick={() => setActive(false)} className="z-20 absolute top-0 bg-blakk-50 w-full h-full"></div> 
            </div> 
            : null
        }</>
    )
}

export default Popup