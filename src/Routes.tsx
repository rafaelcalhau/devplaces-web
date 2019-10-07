import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import Profile from './screens/Profile'
import Spot from './screens/Spot'
import Signup from './screens/Signup'
import { AppState } from './store'

const Routes: FC = () => {
  const user = useSelector((state: AppState) => state.user.data)

  return (
    <Switch>
      <Route path='/signup' component={Signup} />
      {
        user.id
          ? <>
            <Route path='/' exact component={Dashboard} />
            <Route path='/new-spot' component={Spot} />
            <Route path='/profile' component={Profile} />
          </>
          : <Login />
      }
    </Switch>
  )
}

export default Routes
