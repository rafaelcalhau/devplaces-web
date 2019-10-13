import { Action } from 'redux'
import { APICatchError, ReducerAction, ReducerCatchError } from '../types/store'

export const signupFailed = (payload: APICatchError): ReducerCatchError => {
  return { type: 'SIGNUP_FAILED', payload }
}

export const signupRequest = (): Action => {
  return { type: 'SIGNUP_REQUEST' }
}

export const signupSuccess = (): ReducerAction => {
  return { type: 'SIGNUP_SUCCESS' }
}
