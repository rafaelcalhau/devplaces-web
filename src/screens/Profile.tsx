import React, { FC, useState, MouseEvent, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import TextField from '@material-ui/core/TextField'
import { RootState } from 'src/core/store/store'
import { updateRequest as updateUser } from 'src/core/store/containers/user/actions'
import 'src/assets/styles/profile.css'

const useStyles = makeStyles((theme: Theme) => createStyles({
  textField: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(1)
  }
}))

const Profile: FC = (props) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const classes = useStyles(props)

  const user = useSelector((state: RootState) => state.user)
  const [isUpdating, setUpdatingState] = useState(false)

  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [name, setName] = useState<string>(user.data.name)
  const [email, setEmail] = useState<string>(user.data.email)
  const [passw, setPassw] = useState<string>('')
  const [passwConfirm, setPasswConfirm] = useState<string>('')
  const timerRef = useRef<NodeJS.Timeout>()

  // onUnmount
  useEffect(() => {
    return () => {
      if (timerRef.current !== undefined) clearTimeout(timerRef.current)
    }
  }, [])

  const save = (e: MouseEvent): void => {
    e.preventDefault()

    if (name?.length === 0) {
      setError('Please enter your name')
    } else if (email?.length === 0 || email.indexOf('@') <= 1) {
      setError('Please enter a valid email address')
    } else if (passw !== passwConfirm) {
      setError('The password confirmation does not match')
    } else {
      const payload = {
        id: user.data.id,
        name,
        email,
        password: passw,
        token: user.data.token
      }
      setUpdatingState(true)
      dispatch(updateUser(payload))
    }
  }

  useEffect(() => {
    if (user.error) {
      setError('Sorry! Was not possible to update your profile, please try again later.')
    } else {
      setError('')
    }

    if (isUpdating && !user.error && !user.loading) {
      timerRef.current = setTimeout(() => {
        setSuccess('')
        setUpdatingState(false)
      }, 4000)

      setSuccess('You profile data was saved!')
    }
  }, [isUpdating, user])

  return (
    <div id='profile'>
      <h1>My profile</h1>
      {
        error.length > 0 &&
          <p className='error'>{error}</p>
      }
      {
        (error.length === 0 && success.length > 0) &&
          <p className='success'>{success}</p>
      }
      <form>
        <TextField
          id='name'
          autoComplete='off'
          label='NAME'
          className={classes?.textField}
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
          className={classes?.textField}
          margin='normal'
          type='email'
          value={email}
          variant='outlined'
          onChange={(e): void => setEmail(e.target.value)}
        />
        <TextField
          id='password'
          label='PASSWORD'
          className={classes?.textField}
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
              history.goBack()
            }}
          >
            <ArrowBackIcon />
          </button>
          <button
            className='btn fluid'
            type='submit'
            onClick={save}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  )
}

export default Profile
