import { AxiosError } from 'axios'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../index'
import { APICatchError, ReducerAction, ReducerCatchError } from '../types/store'
import { UserLogin, UserSession, UserSignup, UserUpdated } from '../types/user'
import apiClient from '../../services/apiclient'

const loginFailed = (payload: APICatchError): ReducerCatchError => {
  return { type: 'LOGIN_FAILED', payload }
}

const loginRequest = (): Action => {
  return { type: 'LOGIN_REQUEST' }
}

export const loginSuccess = (payload: UserSession): ReducerAction => {
  return { type: 'LOGIN_SUCCESS', payload }
}

export const userNotStored = (): ReducerAction => {
  return { type: 'USER_NOT_STORED' }
}

export const login = (data: UserLogin): ThunkAction<void, AppState, null, Action<string>> => async (dispatch): Promise<void> => {
  dispatch(loginRequest())

  apiClient
    .post('/authenticate', { ...data })
    .then(({ data }) => {
      console.log(data)
      dispatch(loginSuccess(data))
    })
    .catch((err: AxiosError) => dispatch(loginFailed(err)))
}

export const logoutUser = (): ReducerAction => {
  const data = window.localStorage.getItem('devplaces-user')

  if (data) {
    window.localStorage.removeItem('devplaces-user')
  }

  return { type: 'LOGOUT' }
}

const signupFailed = (payload: APICatchError): ReducerCatchError => {
  return { type: 'SIGNUP_FAILED', payload }
}

const signupRequest = (): Action => {
  return { type: 'SIGNUP_REQUEST' }
}

const signupSuccess = (): ReducerAction => {
  return { type: 'SIGNUP_SUCCESS' }
}

export const signup = (payload: UserSignup): ThunkAction<void, AppState, null, Action<string>> => async (dispatch): Promise<void> => {
  dispatch(signupRequest())

  apiClient
    .post('/users', { ...payload })
    .then(() => {
      dispatch(signupSuccess())
      // dispatch(login(payload))
    })
    .catch((err: AxiosError) => dispatch(signupFailed(err)))
}

const userUpdateFailed = (payload: APICatchError): ReducerCatchError => {
  return { type: 'USER_UPDATE_FAILED', payload }
}

const userUpdateRequest = (): Action => {
  return { type: 'USER_UPDATE_REQUEST' }
}

const userUpdateSuccess = (payload: UserUpdated): ReducerAction => {
  return { type: 'USER_UPDATE_SUCCESS', payload }
}

export const updateUser = (id: string|null, payload: UserSignup, token: string|null): ThunkAction<void, AppState, null, Action<string>> => async (dispatch): Promise<void> => {
  dispatch(userUpdateRequest())

  apiClient
    .put(`/users/${id}`, { ...payload }, {
      headers: { authorization: `Bearer ${token}` }
    })
    .then(({ data }) => {
      console.log(data)
      if (data.ok && payload.name && payload.email) {
        dispatch(userUpdateSuccess({
          name: payload.name,
          email: payload.email
        }))
      }
    })
    .catch((err: AxiosError) => dispatch(userUpdateFailed(err)))
}
