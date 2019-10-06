import React from 'react'
import { connect } from 'react-redux'
import Routes from './Routes'
import Login from './screens/Login'
import { AppState } from './store'
import { UserState } from './store/types/user'
import './App.css'

const App: React.FC = (props: any) => {
  const user = props.data
  return !user.id ? <Login /> : <Routes />
}

const mapStateToProps = (state: AppState): Pick<UserState, 'data'> => ({
  data: state.user.data
})

export default connect(mapStateToProps)(App)
