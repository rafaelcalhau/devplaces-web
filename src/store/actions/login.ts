import { Action } from 'redux'
import { APICatchError, ReducerAction, ReducerCatchError } from '../types/store'
import { UserSession } from '../types/user'

export const loginFailed = (payload: APICatchError): ReducerCatchError => {
  return { type: 'LOGIN_FAILED', payload }
}

export const loginRequest = (): Action => {
  return { type: 'LOGIN_REQUEST' }
}

export const loginSuccess = (payload: UserSession): ReducerAction => {
  return { type: 'LOGIN_SUCCESS', payload }
}
