import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import Dashboard from './screens/Dashboard'
import Profile from './screens/Profile'
import Spot from './screens/Spot'

const Routes: FC = () => {
  return (
    <Switch>
      <Route path='/' exact component={Dashboard} />
      <Route path='/new-spot' component={Spot} />
      <Route path='/profile' component={Profile} />
    </Switch>
  )
}

export default Routes
