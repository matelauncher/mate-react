import React from 'react'
import { getVersion, Version, setVersion, getAccounts, Account, selectAccount } from '../../lib/userSettings'
import CSSTransition from 'react-transition-group/CSSTransition'
import { useTranslation } from 'react-i18next'

const AccountMenu = (props: { 
    isAccountsOpen: boolean, 
    setAccountsOpen: Function, 
    accounts: { 
        selected?: Account, 
        accounts: Account[] 
    },
    setTab: Function,
    setAccountsUpdate: Function
}) => {
    const isAccountsOpen = props.isAccountsOpen
    const setAccountsOpen = props.setAccountsOpen
    const accounts = props.accounts
    const setAccountsUpdate = props.setAccountsUpdate

    const setTab = props.setTab

    const { t } = useTranslation()

    const accountsAsReact = accounts.accounts.map((account, i) => {
        return (
        <button key={i} onClick={() => { setAccountsUpdate(account); setAccountsOpen(!isAccountsOpen) }} className="rounded-lg flex p-3 w-full focus:outline-none hover:bg-blk-300 transition-all duration-300 ">
            <div className="flex-shrink-0">
                <img className="h-8 w-8 pixelated" src={`https://minotar.net/helm/${account.nickname}/100.png`} alt="" />
            </div>
            <div className="ml-4 flex-1">
                <h4 className="text-sm text-white leading-tight text-left">{account.nickname}</h4>
                <p className="text-xs text-blk-900 leading-normal text-left">{account.type}</p>
            </div>
        </button>)
    })

    return (
        <CSSTransition
            classNames="dropdown"
            in={isAccountsOpen}
            addEndListener={() => {}}
        ><div className="z-20 w-56 ">{isAccountsOpen ? 
            <div className="absolute bottom-0 mb-10 w-56 z-0 right-0">
                <div className="rounded-lg bg-blk-200 p-2 shadow-xl h-48 overflow-hidden overflow-y-auto">
                    <div className=" w-full focus:outline-none overflow-y-auto">
                        {accountsAsReact}
                        <div className="w-full bg-blk-300 h-px mt-1 mb-1"></div>
                    </div>
                    <div className="">
                        <button onClick={() => { setTab('addAccount'); setAccountsOpen(false) }}className="rounded-lg transition-all duration-300 h-12 text-white w-full flex p-3 bg-blk-200 justify-center items-center focus:outline-none hover:bg-blk-300 ">
                            <div className="ml-4">
                                <h4 className="text-sm leading-tight">{ t('accounts.add') }</h4>
                            </div>
                        </button>
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

export default AccountMenu