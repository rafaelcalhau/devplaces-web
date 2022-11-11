import React, { ComponentElement, ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'

import Dashboard from './screens/Dashboard'
import Login from './screens/Login'
import Profile from './screens/Profile'
import Spot from './screens/Spot'
import Signup from './screens/Signup'
import { RootState } from './core/store/store'

const Routes = (): ComponentElement<ReactNode, any> => {
  const user = useSelector((state: RootState) => state.user.data)

  return (
    <Switch>
      <Route path='/signup' component={Signup} />
      {
        user.id?.length > 0
          ? <>
              <Route path='/' exact component={Dashboard} />
              <Route path='/edit-spot' component={Spot} />
              <Route path='/new-spot' component={Spot} />
              <Route path='/profile' component={Profile} />
            </>
          : <Login />
      }
    </Switch>
  )
}

export default Routes
