import React, { useState } from 'react'
import { connect } from 'react-redux'
import Spinner from './components/material/Spinner'

import Routes from './Routes'
import Login from './screens/Login'
import { useStoredUser } from './modules/customHooks'
import { AppState } from './store'
import { loginSuccess } from './store/actions/user'
import { UserState } from './store/types/user'
import './App.css'

const App: React.FC = (props: any) => {
  const user = props.data
  const [loaderMounted, setLoaderState] = useState(true)

  useStoredUser(user, loginSuccess)

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

  return !user.id ? <Login /> : <Routes />
}

const mapStateToProps = (state: AppState): Pick<UserState, 'data'> | Pick<UserState, 'isLocalStorageChecked'> => ({
  data: state.user.data,
  isLocalStorageChecked: state.user.isLocalStorageChecked
})

export default connect(mapStateToProps)(App)
