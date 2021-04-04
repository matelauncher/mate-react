import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.global.css';
import Bottom from './elements/Bottom';
import TopMenu from './elements/TopMenu';
import TopTitle from './elements/TopTitle';
import News from './tabs/News';
import { parse, Post } from '../lib/newsParser'
import { getHTML } from '../lib/utils'
import { getVersions, VersionsObject } from '../lib/versions'
import { Version, getVersion, getAccounts, Account } from '../lib/userSettings'
import AddAccount from './tabs/AddAccount';


const Hello = () => {
  const [tab, setTab] = useState('news')

  const [posts, setPosts] = useState<Post[]>([])
  const [versions, setVersions] = useState<VersionsObject>({ latest: {}, versions: [] })
  const [isRunning, setRunning] = useState(false)
  const [accounts, setUserAccounts] = useState<{ selected?: Account, accounts: Account[] }>({ accounts: [] })
  const [version, setUserVersion] = useState<Version>({ })

  useEffect(() => {
    const getPosts = async () => {
      const html = await getHTML('https://minecraftmain.ru/page/1/')
      const postsParsed = parse(html)
      setPosts(postsParsed)
    }
    getPosts()
  }, [tab === 'news'])

  useEffect(() => {
    const getMCVersions = async () => {
      const v = await getVersions({})
      setVersions(v)
    }

    getMCVersions()
  }, [])

  useEffect(() => {
    const getUserAccounts = async () => {
      const a = await getAccounts()
      setUserAccounts(a)
    }
    getUserAccounts()
  }, [])

  const renderTab = () => {
    if (tab === 'news') {
      return (<>
      <News 
        posts={posts}
      />
      </>)
    } else if (tab === 'settings') {
      return (<></>)
    } else if (tab === 'addAccount') {
      return (<>
      <AddAccount 
        setTab={setTab}
      />
      </>)
    }

    return null
  }

  return (
    <div className="select-none bg-mc-b300 flex flex-col h-screen flex-nowrap overflow-hidden">
      <TopTitle />
      <TopMenu />
      <div className="overflow-y-auto h-screen">
        {renderTab()}
      </div>
      {tab === 'news'
      ?
      <Bottom 
        versions={versions} 
        isRunning={isRunning}
        setRunning={setRunning}
        setTab={setTab}
        accounts={accounts}
        setUserAccounts={setUserAccounts}
        version={version}
        setUserVersion={setUserVersion}
      />
      :
      null}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
