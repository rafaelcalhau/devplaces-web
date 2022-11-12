import React, { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Spinner from './components/material/Spinner'
import Routes from './Routes'
import UserMenu from './components/UserMenu'
import { useStoredUser } from './modules/customHooks'
import { RootState } from './core/store/store'

import Logo from './assets/images/logo.svg'
import settings from './core/config/settings.json'
import './App.css'

const App: FC = () => {
  const { data: user, isLocalStorageChecked } = useSelector((state: RootState) => state.user)
  const [loaderIsActive, setLoaderIsActive] = useState<boolean>(true)
  const containerStyle = user.id.length > 0
    ? { marginTop: 62 }
    : { marginTop: 0, display: 'flex', justifyContent: 'center' }

  useStoredUser(user)

  useEffect(() => {
    if (isLocalStorageChecked) setLoaderIsActive(false)
  }, [isLocalStorageChecked])

  if (loaderIsActive) {
    return (
      <div>
        <Spinner color='#fff' />
      </div>
    )
  }

  return (
    <BrowserRouter>
      {user.id.length > 0 && <UserMenu />}
      <div className="container" style={containerStyle}>
        <img src={Logo} alt={settings.appName} />
        <div className="content">
          <Routes />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
