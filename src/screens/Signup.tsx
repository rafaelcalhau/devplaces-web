import React, { FC, useState, MouseEvent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import TextField from '@material-ui/core/TextField'

import { signupRequest as signup } from 'src/core/store/containers/user/actions'
import 'src/assets/styles/signup.css'
import { RootState } from 'src/core/store/store'

const Signup: FC<RouteComponentProps> = (props: RouteComponentProps) => {
  const [error, setError] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [passw, setPassw] = useState<string>('')
  const [passwConfirm, setPasswConfirm] = useState<string>('')
  const [isSigningUp, setSigningUpState] = useState<boolean>(false)

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      textField: {
        marginTop: theme.spacing(0),
        marginBottom: theme.spacing(1)
      }
    })
  )
  const classes = useStyles(props)
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.user)

  const register = (e: MouseEvent): void => {
    e.preventDefault()

    if (name.length === 0) {
      setError('Please enter your name')
    } else if (email.length === 0 || email.indexOf('@') <= 1) {
      setError('Please enter a valid email address')
    } else if (passw.length === 0) {
      setError('Please enter your password')
    } else if (passwConfirm.length === 0) {
      setError('Please confirm your password')
    } else if (passw !== passwConfirm) {
      setError('The password confirmation does not match')
    } else {
      setSigningUpState(true)
      dispatch(signup({ name, email, password: passw }))
    }
  }

  useEffect(() => {
    if (user.error !== undefined) {
      setError('Whoops! Could not create your account now, please try again later.')
    } else {
      setError('')
    }

    if (isSigningUp && !user.error && !user.loading) {
      props.history.push('/')
    }
  }, [isSigningUp, props, user])

  return (
    <div id='signup'>
      <h1>Create Your Account</h1>
      {
        error.length > 0 &&
          <p className='error'>{error}</p>
      }
      <form>
        <TextField
          id='name'
          autoComplete='off'
          label='NAME'
          className={classes.textField}
          margin='normal'
          type='text'
          value={name}
          variant='outlined'
          onChange={(e): void => setName(e.target.value)}
        />
        <TextField
          id='email'
          autoComplete='off'
          label='EMAIL'
          placeholder='Your best email'
          className={classes.textField}
          margin='normal'
          type='email'
          value={email}
          variant='outlined'
          onChange={(e): void => setEmail(e.target.value)}
        />
        <TextField
          id='password'
          label='PASSWORD'
          className={classes.textField}
          margin='normal'
          type='password'
          value={passw}
          variant='outlined'
          onChange={(e): void => setPassw(e.target.value)}
        />
        <TextField
          id='passwordConfirm'
          label='CONFIRM YOUR PASSWORD'
          className={classes.textField}
          margin='normal'
          type='password'
          value={passwConfirm}
          variant='outlined'
          onChange={(e): void => setPasswConfirm(e.target.value)}
        />

        <div className='buttons'>
          <button
            className='btn back'
            onClick={(e): void => {
              e.preventDefault()
              props.history.goBack()
            }}
          >
            <ArrowBackIcon />
          </button>
          <button
            className='btn fluid'
            type='submit'
            onClick={register}
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  )
}

export default Signup
