import React from 'react'

import { getVersion, Version } from '../../lib/userSettings'
import CSSTransition from 'react-transition-group/CSSTransition'
import { VersionsObject } from '../../lib/versions'

const VersionMenu = (props: { 
    isVersionsOpen: boolean, 
    setVersionsOpen: Function, 
    versions: VersionsObject,
    setVersion: Function
}) => {
    const isVersionsOpen = props.isVersionsOpen
    const setVersionsOpen = props.setVersionsOpen
    const versions = props.versions
    const setVersion = props.setVersion

    const versionAsReact = versions.versions.map((version, i) => {
        return (
        <button key={i} onClick={() => { setVersion(version); setVersionsOpen(!isVersionsOpen) }} className="rounded-lg flex p-3 w-full focus:outline-none hover:bg-blk-300 transition-all duration-300 ">
            <div className="flex-shrink-0">
                <img className="h-8 w-8 " src={`../assets/img/mc.png`} alt="" />
            </div>
            <div className="ml-4 flex-1">
                <h4 className="text-sm text-white leading-tight text-left">Java Edition</h4>
                <p className="text-xs text-blk-900 leading-normal text-left">{version.id} | {version.type}</p>
            </div>
        </button>)
    })

    const latestVersionAvailable = versions.versions.find(ver => ver.id === versions.latest.release)

    const latestAsReact = (
        <>
        <button onClick={() => { setVersion(latestVersionAvailable!); setVersionsOpen(!isVersionsOpen) }} className="rounded-lg flex p-3 w-full focus:outline-none hover:bg-blk-300 transition-all duration-300 ">
            <div className="flex-shrink-0">
                <img className="h-8 w-8 " src={`../assets/img/mc.png`} alt="" />
            </div>
            <div className="ml-4 flex-1">
                <h4 className="text-sm text-white leading-tight text-left">Java Edition</h4>
                <p className="text-xs text-blk-900 leading-normal text-left">{latestVersionAvailable?.id} | {latestVersionAvailable?.type}</p>
            </div>
        </button>
        <div className="w-full bg-blk-300 h-px mt-1 mb-1"></div>
        </>
    )

    return (
        <CSSTransition
            classNames="dropdown"
            in={isVersionsOpen}
            addEndListener={() => {}}
        ><div className="z-20 w-56 ">{isVersionsOpen ? 
            <div className="absolute bottom-0 mb-10 w-56 z-0">
                <div className="rounded-lg bg-blk-200 p-2 shadow-xl h-48 overflow-hidden overflow-y-auto">
                    {latestAsReact}
                    <div className=" w-full focus:outline-none overflow-y-auto">
                        {versionAsReact}
                    </div>
                </div>
                <div className="w-full flex items-center justify-center z-40">
                    <div className="self-center z-40">
                        <svg className="" height="24" width="24">
                            <polygon points="24,0 0,0 12,10" className="triangle text-blk-200" fill="currentColor"/>
                        </svg>
                    </div>
                </div>
            </div> : null}
            </div>
        </CSSTransition>
    )
}

export default VersionMenu