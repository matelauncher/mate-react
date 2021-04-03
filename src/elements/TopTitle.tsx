import React from 'react';
import { close, minimize } from '../../lib/electron-window'
import { launcherClass } from '../../lib/launcher'
import { platform } from '../../lib/utils'

const closeWindow = () => {
    if (launcherClass.proc)
        launcherClass.proc.kill()
    close()
}

const Top = () => {
    return (
        <div className="h-8 w-full bg-mc-b300 fixed z-50 flex">
            <div className="h-full w-full text-white flex flex-row justify-between">
                {
                platform === 'darwin' ?
                (<>
                <div className="self-start flex flex-row p-2 ml-1">
                    <div className="closemac mr-2">
                        <button onClick={() => closeWindow()} className="closebutton">

                        </button>
                    </div>
                    <div className="minimizemac mr-2">
                        <button onClick={() => minimize()} className="minimizebutton">

                        </button>
                    </div>
                </div>
                <div className="w-full wappdrag flex flex-row-reverse">
                    <img className="mt-1 mr-2 h-6 w-6 " src="../assets/img/icon.png" alt="MATE" />
                </div>
                </>
                )
                : 
                (
                <>
                <div className="w-full wappdrag">
                    <img className="mt-1 ml-2 h-6 w-6" src="../assets/img/icon.png" alt="MATE" />
                </div>
                <div className="self-end flex flex-row">
                    <button onClick={() => minimize()} className="ui-btn minimize flex justify-center focus:outline-none items-center">
                        <svg x="0px" y="0px" viewBox="0 0 10.2 1"><rect x="0" y="50%" width="10.2" height="1" /></svg>
                    </button>
                    <button onClick={() => closeWindow()} className="ui-btn close flex justify-center focus:outline-none items-center">
                        <svg viewBox="0 0 10 10">
                            <polygon points="10.2,0.7 9.5,0 5.1,4.4 0.7,0 0,0.7 4.4,5.1 0,9.5 0.7,10.2 5.1,5.8 9.5,10.2 10.2,9.5 5.8,5.1" />
                        </svg>
                    </button>
                </div>
                </>)
                }
            </div>
        </div>
    )
}

export default Top