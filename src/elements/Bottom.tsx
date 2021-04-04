import React, { useEffect, useState } from 'react'
import { platform, isEmptyObject } from '../../lib/utils'
import launcher, { getMCPath, launcherClass } from '../../lib/launcher'
import MCButton from './MCButton'
import { useTranslation } from 'react-i18next'
import { Authenticator  } from 'minecraft-launcher-core'
import { VersionsObject } from '../../lib/versions'
import { getVersion, Version, setVersion, getAccounts, Account, selectAccount } from '../../lib/userSettings'
import { hide, show } from '../../lib/electron-window'
import AccountMenu from './bottom/AccountMenu'
import VersionMenu from './bottom/VersionMenu'


const buttonClassOpen = (bool: boolean) => 
`${bool ? 'bg-blk-300 ' : ''} items-center self-end flex-none w-56 flex p-3 py-3 ava h-16 text-left focus:outline-none transition-all duration-250 hover:bg-blk-300`

const Bottom = (props: { 
    versions: VersionsObject,
    isRunning: boolean,
    setRunning: Function,
    setTab: Function,
    accounts: { selected?: Account, accounts: Account[] },
    setUserAccounts: Function,
    version: Version,
    setUserVersion: Function
}) => {
    const { t } = useTranslation()

    const setTab = props.setTab

    const [isAccountsOpen, setAccountsOpen] = useState(false)
    const [isVersionsOpen, setVersionsOpen] = useState(false)

    const isRunning = props.isRunning
    const setRunning = props.setRunning

    const accounts = props.accounts
    const setUserAccounts = props.setUserAccounts
    const version = props.version
    const setUserVersion = props.setUserVersion

    const versions = props.versions

    useEffect(() => {
        const getUserVersion = async () => {
            const v = await getVersion()
            setUserVersion(v)
        }

        getUserVersion()
        
    }, [])

    const launch = () => {
        launcherClass.launch({
            root: getMCPath(platform),
            version: {
                number: version.id!,
                type: version.type!
            },
            memory: {
                max: "2G",
                min: "1G"
            },
            authorization: Authenticator.getAuth(accounts.selected!.nickname)
        })
        .then(() => {
            setRunning(true)
            launcher.on('close', () => {
                setRunning(false)
                show()
            })
            hide()
        })
    }

    const setVersionUpdate = (version: Version) => {
        setVersion(version)
        setUserVersion(version)
    }

    const setAccountsUpdate = (account: Account) => {
        selectAccount(account)
        .then(async () => {
            const acc = await getAccounts()
            setUserAccounts(acc)
        })
    }

    return (
        <>
        <VersionMenu 
            isVersionsOpen={isVersionsOpen}
            setVersionsOpen={setVersionsOpen}
            versions={versions}
            setVersion={setVersionUpdate}
        />
        <AccountMenu 
            isAccountsOpen={isAccountsOpen}
            setAccountsOpen={setAccountsOpen}
            accounts={accounts}
            setTab={setTab}
            setAccountsUpdate={setAccountsUpdate}
        />
        <div className="flex flex-row w-full justify-end self-end z-10 shadow-xl-rev  bg-mc-b200 bottom-0 absolute">
            <button onClick={() => { setAccountsOpen(false); setVersionsOpen(!isVersionsOpen) }} className={buttonClassOpen(isVersionsOpen)}>
                <div className={platform === 'darwin' ? true ? 'flex' : 'flex opacity-50' : 'flex'}>
                    {!isEmptyObject(version) ? 
                    <>
                    <div className="flex-shrink-0">
                        <img className="h-8 w-8 " src="../assets/img/mc.png" alt=""></img>
                    </div>
                    <div className="ml-4">
                        <div className="">
                            <h4 className="text-sm text-white leading-tight text-left">Java Edition</h4>
                            <p className="text-xs text-blk-900 leading-normal text-left">{version.id} | {version.type}</p>
                        </div>
                    </div>
                    </>
                    : 
                    <>
                    <div className="flex-shrink-0">
                        
                    </div>
                    <div className="ml-4">
                        <div className="">
                            <h4 className="text-sm text-white leading-tight text-left">{t('version.no_version.top')}</h4>
                            <p className="text-xs text-blk-900 leading-normal text-left">{t('version.no_version.bottom')}</p>
                        </div>
                    </div>
                    </>
                    }
                </div>
            </button>
            <div className="w-full flex mx-auto p-5 h-16 self-center justify-center">
                <MCButton isMinecraft={true} text={t('play')} onClick={() => !isRunning && accounts.selected ? launch() : null} className={isRunning ? "self-center -mt-12 h-16 w-64 opacity-50" : "self-center -mt-12 h-16 w-64"}/>
            </div>
            <button onClick={(e) => { setVersionsOpen(false); setAccountsOpen(!isAccountsOpen); e.stopPropagation() }} className={buttonClassOpen(isAccountsOpen)}>
                {!isEmptyObject(accounts.selected!) ? 
                    <>
                    <div className="flex-shrink-0">
                        <img className="h-8 w-8 pixelated" src={`https://minotar.net/helm/${accounts.selected!.nickname}/100.png`} alt=""></img>
                    </div>
                    <div className="ml-4">
                        <div className="">
                            <div className="flex flex-row">
                                <h4 className="text-sm text-white leading-tight">{accounts.selected!.nickname}</h4>
                            </div>
                            <p className="text-xs text-blk-900 leading-normal">{accounts.selected!.type}</p>
                        </div>
                    </div>
                    </>
                    : 
                    <>
                    <div className="flex-shrink-0">

                    </div>
                    <div className="ml-4">
                        <div className="">
                            <div className="flex flex-row">
                                <h4 className="text-sm text-white leading-tight">{t('accounts.no_accounts.top')}</h4>
                            </div>
                            <p className="text-xs text-blk-900 leading-normal">{t('accounts.no_accounts.bottom')}</p>
                        </div>
                    </div>
                    </>
                }
            </button>
        </div>
        </>
    )
}



export default Bottom