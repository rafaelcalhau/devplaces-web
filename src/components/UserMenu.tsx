import React, { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import AccountCircle from '@material-ui/icons/AccountCircle'
import ExitToApp from '@material-ui/icons/ExitToApp'
import { logoutUser } from '../store/actions/user'

export default function UserMenu (): ReactElement {
  const dispatch = useDispatch()
  const logout = (): void => {
    dispatch(logoutUser())
  }

  return (
    <nav className="usernav">
      <button>
        <AccountCircle />
        Profile
      </button>
      <button onClick={logout}>
        <ExitToApp />
        Logout
      </button>
    </nav>
  )
}
