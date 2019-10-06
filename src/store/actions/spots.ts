import { AxiosError } from 'axios'
import { Action } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { AppState } from '../index'
import { APICatchError, ReducerAction, ReducerCatchError } from '../types/store'
import { SpotsState } from '../types/spots'
import apiClient from '../../services/apiclient'

const loadUserSpotsFailed = (payload: APICatchError): ReducerCatchError => ({ type: 'LOAD_SPOTS_FAILED', payload })

const loadUserSpotsRequest = (): Action => ({ type: 'LOAD_SPOTS_REQUEST' })

export const loadUserSpotsSuccess = (payload: SpotsState): ReducerAction => ({ type: 'LOAD_SPOTS_SUCCESS', payload })

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
