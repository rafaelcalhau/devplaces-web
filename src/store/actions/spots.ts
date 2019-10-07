import { AxiosError } from 'axios'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../index'
import { APICatchError, ReducerAction, ReducerCatchError } from '../types/store'
import { SpotsState } from '../types/spots'
import apiClient from '../../services/apiclient'

const loadUserSpotsFailed = (payload: APICatchError): ReducerCatchError => {
  return { type: 'LOAD_SPOTS_FAILED', payload }
}

const loadUserSpotsRequest = (): Action => {
  return { type: 'LOAD_SPOTS_REQUEST' }
}

export const loadUserSpotsSuccess = (payload: SpotsState): ReducerAction => {
  return { type: 'LOAD_SPOTS_SUCCESS', payload }
}

export const loadUserSpots = (token: string|null): ThunkAction<void, AppState, null, Action<string>> => async (dispatch): Promise<void> => {
  dispatch(loadUserSpotsRequest())

  apiClient
    .get('/spots', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then(({ data }) => {
      dispatch(loadUserSpotsSuccess(data))
    })
    .catch((err: AxiosError) => dispatch(loadUserSpotsFailed(err)))
}

const submitSpotFailed = (payload: APICatchError): ReducerCatchError => {
  return { type: 'SUBMIT_SPOT_FAILED', payload }
}

const submitSpotRequest = (): Action => {
  return { type: 'SUBMIT_SPOT_REQUEST' }
}

const submitSpotSuccess = (payload: any): ReducerAction => {
  return { type: 'SUBMIT_SPOT_SUCCESS', payload }
}

export const submitSpot = (data: FormData, userid: string|null, token: string|null): ThunkAction<void, AppState, null, Action<string>> => async (dispatch): Promise<void> => {
  dispatch(submitSpotRequest())

  apiClient
    .post('/spots', data, {
      headers: {
        authorization: `Bearer ${token}`,
        userid
      }
    })
    .then(({ data }) => {
      dispatch(submitSpotSuccess(data))
    })
    .catch((err: AxiosError) => dispatch(submitSpotFailed(err)))
}
