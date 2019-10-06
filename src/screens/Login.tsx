import React, { SFC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import { login } from '../store/actions/user'
import { AppState } from '../store'

const Login: SFC = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      textField: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(1)
      }
    })
  )
  const authError = useSelector((state: AppState) => state.user.authenticationError)
  const classes = useStyles()
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const authenticate = (e: any): void => {
    e.preventDefault()

    if ((email.length && email.indexOf('@') > 1) && password.length) {
      dispatch(login({ email, password }))
    } else {
      setError('Email address is invalid.')
    }
  }

  useEffect(() => {
    if (authError && authError.name === 'Error') {
      setError('Authentication Failed')
    } else {
      setError('')
    }
  }, [authError])

  return (
    <>
      <p>
        Rentable or free places for <strong>designers and developers</strong>.
        Find the right place to build your amazing things!
      </p>

      {
        error.length > 0 &&
        <p className="error">{error}</p>
      }

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
          onClick={authenticate}>
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
    </>
  )
}

export default Login
