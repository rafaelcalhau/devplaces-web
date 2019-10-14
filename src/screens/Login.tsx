import React, { SFC, useEffect, useState, MouseEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

import { loginRequest } from '../store/containers/user/actions'
import { AppState } from '../store'
import '../assets/styles/login.css'

const Login: SFC = () => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      textField: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(1)
      }
    })
  )
  const authError = useSelector((state: AppState) => state.user.error)
  const classes = useStyles()
  const dispatch = useDispatch()
  const [error, setError] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const authenticate = (e: MouseEvent): void => {
    e.preventDefault()

    if ((email.length && email.indexOf('@') > 1) && password.length) {
      dispatch(loginRequest(email, password))
    } else {
      setError('Please enter a valid email address')
    }
  }

  useEffect(() => {
    if (authError) {
      setError('Authentication Failed')
    } else {
      setError('')
    }
  }, [authError])

  return (
    <div id="login">
      <p>
        Rentable or free places for <strong>designers and developers</strong>.
        Find the right place to build your amazing things!
      </p>

      {
        error.length > 0 &&
        <p className="error">{error}</p>
      }

      <form>
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
          className="btn fluid"
          type="submit"
          onClick={authenticate}>
            Sign In
        </button>

        <div className="or">or</div>

        <Link to='/signup'>
          <button
            className="btn fluid basic">
              Create your Account
          </button>
        </Link>
      </form>
    </div>
  )
}

export default Login
