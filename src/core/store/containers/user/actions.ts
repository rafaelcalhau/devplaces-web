import { Action, action } from 'typesafe-actions'
import { UserActions, UserSession, UserSignup } from './types'

export const loginRequest = (
  email: string,
  password: string
): Action<UserActions.LOGIN_REQUEST> => action(UserActions.LOGIN_REQUEST, { email, password })

export const loginSuccess = (data: UserSession): Action<UserActions.LOGIN_SUCCESS> => action(UserActions.LOGIN_SUCCESS, { data })

export const loginFailure = (): Action<UserActions.LOGIN_FAILURE> => action(UserActions.LOGIN_FAILURE)

export const logout = (): Action<UserActions.LOGOUT> => action(UserActions.LOGOUT)

export const signupRequest = (data: UserSignup): Action<UserActions.SIGNUP_REQUEST> => action(UserActions.SIGNUP_REQUEST, data)

export const signupSuccess = (data: UserSession): Action<UserActions.SIGNUP_SUCCESS> => action(UserActions.SIGNUP_SUCCESS, data)

export const signupFailure = (): Action<UserActions.SIGNUP_FAILURE> => action(UserActions.SIGNUP_FAILURE)

export const updateRequest = (data: UserSession): Action<UserActions.UPDATE_REQUEST> => action(UserActions.UPDATE_REQUEST, data)

export const updateSuccess = (email: string, name: string): Action<UserActions.UPDATE_SUCCESS> => action(UserActions.UPDATE_SUCCESS, { email, name })

export const updateFailure = (): Action<UserActions.UPDATE_FAILURE> => action(UserActions.UPDATE_FAILURE)

export const userNotStored = (): Action<UserActions.NOT_STORED_LOCALLY> => action(UserActions.NOT_STORED_LOCALLY)
