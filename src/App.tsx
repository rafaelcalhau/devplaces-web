import React, { useState } from 'react'
import { connect } from 'react-redux'

import { AppState } from './store'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import Logo from './assets/logo.svg'
import { appName } from './config/settings.json'
import './App.css'

const App: React.FC = (props: any) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      textField: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(1)
      }
    })
  )
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="container">
      <img src={Logo} alt={appName} />
      <div className="content">
        <p>
          Rentable or free places for <strong>designers and developers</strong>.
          Find the right place to build your amazing things!
        </p>

        <form id="login">
          <TextField
            id="email"
            autoComplete="off"
            label="EMAIL"
            placeholder="Your best email"
            className={classes.textField}
            margin="normal"
            type="email"
            value={email}
            variant="outlined"
            onChange={(e): void => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="PASSWORD"
            className={classes.textField}
            margin="normal"
            type="password"
            value={password}
            variant="outlined"
            onChange={(e): void => setPassword(e.target.value)}
          />
          <button
            className="btn"
            type="submit"
            onClick={(e): void => e.preventDefault()}>
              Sign In
          </button>

          <div className="or">or</div>

          <button
            className="btn basic"
            type="submit"
            onClick={(e): void => e.preventDefault()}>
              Create your Account
          </button>
        </form>
      </div>
    </div>
  )
}

const mapStateToProps = (state: AppState): Pick<AppState, 'user'> => ({
  user: state.user
})

export default connect(mapStateToProps)(App)
