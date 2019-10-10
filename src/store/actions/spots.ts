import { AxiosError } from 'axios'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../index'
import { APICatchError, ReducerAction, ReducerCatchError } from '../types/store'
import { SpotsState } from '../types/spots'
import apiClient from '../../services/apiclient'

const cleanupSpotState = (): ReducerAction => {
  return { type: 'CLEANUP_SPOT_STATE' }
}
const resetStateIdentifiers = (time = 4000): ThunkAction<void, AppState, null, Action<string>> => async (dispatch): Promise<void> => {
  setTimeout(() => dispatch(cleanupSpotState()), time)
}

const deleteSpotFailed = (payload: APICatchError): ReducerCatchError => {
  return { type: 'DELETE_SPOT_FAILED', payload }
}

const deleteSpotRequest = (): Action => {
  return { type: 'DELETE_SPOT_REQUEST' }
}

const deleteSpotSuccess = (payload: string): ReducerAction => {
  return { type: 'DELETE_SPOT_SUCCESS', payload }
}

export const deleteSpot = (id: string, userid: string|null, token: string|null): ThunkAction<void, AppState, null, Action<string>> => async (dispatch): Promise<void> => {
  dispatch(deleteSpotRequest())

  apiClient
    .delete(`/spots/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        userid
      }
    })
    .then(({ data }) => {
      if (data.deleted.ok) {
        dispatch(deleteSpotSuccess(id))
      }
    })
    .catch((err: AxiosError) => dispatch(deleteSpotFailed(err)))
}

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

const saveSpotFailed = (payload: APICatchError): ReducerCatchError => {
  return { type: 'SAVE_SPOT_FAILED', payload }
}

const saveSpotRequest = (): Action => {
  return { type: 'SAVE_SPOT_REQUEST' }
}

const saveSpotSuccess = (payload: any): ReducerAction => {
  return { type: 'SAVE_SPOT_SUCCESS', payload }
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

export const saveSpot = (id: string, data: FormData, userid: string|null, token: string|null): ThunkAction<void, AppState, null, Action<string>> => async (dispatch): Promise<void> => {
  dispatch(saveSpotRequest())

  apiClient
    .put(`/spots/${id}`, data, {
      headers: {
        authorization: `Bearer ${token}`,
        userid
      }
    })
    .then(({ data }) => {
      if (data._id) {
        dispatch(saveSpotSuccess(data))
        dispatch(resetStateIdentifiers())
      }
    })
    .catch((err: AxiosError) => dispatch(saveSpotFailed(err)))
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
      dispatch(resetStateIdentifiers())
    })
    .catch((err: AxiosError) => dispatch(submitSpotFailed(err)))
}
