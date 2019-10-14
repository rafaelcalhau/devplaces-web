import { action } from 'typesafe-actions'
import { UserActions, UserSession, UserSignup } from './../user/types'

export const loginRequest = (email: string, password: string) => action(UserActions.LOGIN_REQUEST, { email, password })
export const loginSuccess = (data: UserSession) => action(UserActions.LOGIN_SUCCESS, { data })
export const loginFailure = () => action(UserActions.LOGIN_FAILURE)

export const logout = () => action(UserActions.LOGOUT)

export const signupRequest = (data: UserSignup) => action(UserActions.SIGNUP_REQUEST, data)
export const signupSuccess = (data: UserSession) => action(UserActions.SIGNUP_SUCCESS, data)
export const signupFailure = () => action(UserActions.SIGNUP_FAILURE)

export const updateRequest = (data: UserSession) => action(UserActions.UPDATE_REQUEST, data)
export const updateSuccess = (email: string, name: string) => action(UserActions.UPDATE_SUCCESS, { email, name })
export const updateFailure = () => action(UserActions.UPDATE_FAILURE)

export const userNotStored = () => action(UserActions.NOT_STORED_LOCALLY)
