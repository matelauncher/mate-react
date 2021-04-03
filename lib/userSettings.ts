import * as storage from 'electron-storage'

export interface Account {
    nickname: string,
    type: 'pirate' | 'license',
    credentials?: {
        email: string,
        password: string
    }
}

export interface Version {
    id?: string,
    type?: string, // 'release' | 'snapshot',
    url?: string
}

export const getAccounts = async (): Promise<{ selected?: Account, accounts: Account[] }> => {
    try {
        return await storage.get('accounts')
    } catch (e) {
        await storage.set('accounts', { accounts: [] })
        return { accounts: [] }
    }
}

export const addAccount = async (account: Account) => {
    const accounts: { selected?: Account, accounts: Account[] } = await getAccounts()
    accounts.accounts.push(account)
    await storage.set('accounts', accounts)
}

export const removeAccount = async (nickname: string) => {
    let accounts: { selected?: Account, accounts: Account[] } = await getAccounts()
    const accountToRemove = accounts.accounts.find(account => account.nickname === nickname)
    accounts.accounts = accounts.accounts.filter(account => account !== accountToRemove)
    await storage.set('accounts', accounts)
}

export const selectAccount = async (account: Account) => {
    let accounts: { selected?: Account, accounts: Account[] } = await getAccounts()
    const accountToSelectIndex = accounts.accounts.find(a => a.nickname === account.nickname)
    accounts.selected = accountToSelectIndex
    await storage.set('accounts', accounts)
}

export const setVersion = async (version: Version) => await storage.set('version', version)

export const getVersion = async (): Promise<Version> => {
    try {
        return await storage.get('version')
    } catch (e) {
        // FIXME: error is throwed but version is ok
        await storage.set('version', {})
        return {}
    }
}