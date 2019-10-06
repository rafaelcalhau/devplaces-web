import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../index'
import { APICatchError, ReducerAction, ReducerCatchError } from '../types/store'
import { UserLogin, UserSession } from '../types/user'
import apiClient from '../../services/apiclient'

const loginFailed = (payload: APICatchError): ReducerCatchError => ({ type: 'LOGIN_FAILED', payload })

const loginRequest = (): Action => ({ type: 'LOGIN_REQUEST' })

export const loginSuccess = (payload: UserSession): ReducerAction => ({ type: 'LOGIN_SUCCESS', payload })

export const login = (data: UserLogin): ThunkAction<void, AppState, null, Action<string>> => async (dispatch): Promise<any> => {
  dispatch(loginRequest())

  apiClient
    .post('/authenticate', { ...data })
    .then(({ data }) => {
      dispatch(loginSuccess(data))
    })
    .catch((err: any) => dispatch(loginFailed(err)))
}