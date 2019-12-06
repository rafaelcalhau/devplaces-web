import { hot } from 'react-hot-loader/root'
import React, { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Spinner from './components/material/Spinner'
import Routes from './Routes'
import UserMenu from './components/UserMenu'
import { useStoredUser } from './modules/customHooks'
import { AppState } from './store'

import Logo from './assets/images/logo.svg'
import { appName } from './config/settings.json'
import './App.css'

const App: FC = () => {
  const { data: user, isLocalStorageChecked } = useSelector((state: AppState) => state.user)
  const [loaderMounted, setLoaderState] = useState(true)

  useStoredUser(user)

  if (!isLocalStorageChecked || loaderMounted) {
    let pageLoaderClassList = 'pageloader'

    if (isLocalStorageChecked) {
      pageLoaderClassList += ' fadeOut'

      setTimeout(() => {
        setLoaderState(false)
      }, 1000)
    }

    return (
      <div className={pageLoaderClassList}>
        <Spinner color='#fff' />
      </div>
    )
  }

  return (
    <BrowserRouter>
      {
        user.id && <UserMenu />
      }
      <div className="container" style={!user.id ? { marginTop: 62 } : { marginTop: 0 }}>
        <img src={Logo} alt={appName} />
        <div className="content">
          <Routes />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default hot(App)
