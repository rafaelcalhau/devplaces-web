import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToApp from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Apps'

import { logout } from '../store/containers/user/actions'

export default function UserMenu (): ReactElement {
  const dispatch = useDispatch()
  const history = useHistory()
  const dashboard = (): void => { history.push('/') }
  const doLogout = (): void => { dispatch(logout()) }
  const profile = (): void => { history.push('/profile') }

  return (
    <nav className="usernav">
      <button onClick={dashboard}>
        <HomeIcon />
        Dashboard
      </button>
      <button onClick={profile}>
        <AccountCircle />
        Profile
      </button>
      <button onClick={doLogout}>
        <ExitToApp />
        Logout
      </button>
    </nav>
  )
}
