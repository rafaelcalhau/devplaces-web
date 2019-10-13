import { AxiosError } from 'axios'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../index'
import { APICatchError, ReducerAction, ReducerCatchError } from '../types/store'
import { UserLogin, UserSignup, UserUpdated } from '../types/user'
import apiClient from '../../services/apiclient'
import * as LoginActions from './login'
import * as SignupActions from './signup'

export const userNotStored = (): ReducerAction => {
  return { type: 'USER_NOT_STORED' }
}

export const login = (data: UserLogin): ThunkAction<void, AppState, null, Action<string>> => async (dispatch): Promise<void> => {
  dispatch(LoginActions.loginRequest())

  apiClient
    .post('/authenticate', { ...data })
    .then(({ data }) => {
      dispatch(LoginActions.loginSuccess(data))
    })
    .catch((err: AxiosError) => dispatch(LoginActions.loginFailed(err)))
}

export const logoutUser = (): ReducerAction => {
  const data = window.localStorage.getItem('devplaces-user')

  if (data) {
    window.localStorage.removeItem('devplaces-user')
  }

  return { type: 'LOGOUT' }
}

export const signup = (payload: UserSignup): ThunkAction<void, AppState, null, Action<string>> => async (dispatch): Promise<void> => {
  dispatch(SignupActions.signupRequest())

  apiClient
    .post('/users', { ...payload })
    .then(() => {
      dispatch(SignupActions.signupSuccess())
    })
    .catch((err: AxiosError) => dispatch(SignupActions.signupFailed(err)))
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
