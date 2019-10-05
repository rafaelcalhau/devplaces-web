import React from 'react'
import { connect } from 'react-redux'
import Routes from './Routes'
import Login from './screens/Login'
import { AppState } from './store'
import './App.css'

const App: React.FC = (props: any) => {
  const user = props.user
  return !user.id ? <Login /> : <Routes />
}

const mapStateToProps = (state: AppState): Pick<AppState, 'user'> => ({
  user: state.user
})

export default connect(mapStateToProps)(App)
