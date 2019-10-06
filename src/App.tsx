import React, { SFC, useState } from 'react'
import { connect, useDispatch } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Spinner from './components/material/Spinner'

import Routes from './Routes'
import Login from './screens/Login'
import { useStoredUser } from './modules/customHooks'
import { AppState } from './store'
import { logoutUser } from './store/actions/user'
import { UserSession } from './store/types/user'

import Logo from './assets/images/logo.svg'
import { appName } from './config/settings.json'
import './App.css'

interface AppProps {
  data: UserSession;
  isLocalStorageChecked: boolean;
}

const App: SFC<AppProps> = (props: AppProps) => {
  const dispatch = useDispatch()
  const user = props.data
  const [loaderMounted, setLoaderState] = useState(true)

  useStoredUser(user)

  if (!props.isLocalStorageChecked || loaderMounted) {
    let pageLoaderClassList = 'pageloader'

    if (props.isLocalStorageChecked) {
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

  const logout = (): void => {
    dispatch(logoutUser())
  }

  return (
    <BrowserRouter>
      <div className="container">
        <img src={Logo} alt={appName} />
        {
          user.id &&
            <div className="usernav">
              <button onClick={logout}>Logout</button>
            </div>
        }

        <div className="content">
          {
            !user.id ? <Login /> : <Routes />
          }
        </div>
      </div>
    </BrowserRouter>
  )
}

const mapStateToProps = (state: AppState): AppProps => ({
  data: state.user.data,
  isLocalStorageChecked: state.user.isLocalStorageChecked
})

export default connect(mapStateToProps)(App)
