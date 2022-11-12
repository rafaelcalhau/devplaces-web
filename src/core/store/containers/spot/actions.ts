import { Action, action } from 'typesafe-actions'
import { ActionDeletePayload, SpotActions, Spot, SpotSubmit } from './types'

export const createRequest = (data: SpotSubmit): Action<SpotActions.CREATE_REQUEST> => action(SpotActions.CREATE_REQUEST, data)
export const createSuccess = (data: Spot): Action<SpotActions.CREATE_SUCCESS> => action(SpotActions.CREATE_SUCCESS, { data })
export const createFailure = (): Action<SpotActions.CREATE_FAILURE> => action(SpotActions.CREATE_FAILURE)

export const deleteRequest = (data: ActionDeletePayload): Action<SpotActions.DELETE_REQUEST> => action(SpotActions.DELETE_REQUEST, data)
export const deleteSuccess = (id: string): Action<SpotActions.DELETE_SUCCESS> => action(SpotActions.DELETE_SUCCESS, { id })
export const deleteFailure = (): Action<SpotActions.DELETE_FAILURE> => action(SpotActions.DELETE_FAILURE)

export const loadRequest = (token: string): Action<SpotActions.LOAD_REQUEST> => action(SpotActions.LOAD_REQUEST, { token })
export const loadSuccess = (data: Spot[]): Action<SpotActions.LOAD_SUCCESS> => action(SpotActions.LOAD_SUCCESS, { data })
export const loadFailure = (): Action<SpotActions.LOAD_FAILURE> => action(SpotActions.LOAD_FAILURE)

export const signupRequest = (): Action<SpotActions.DELETE_REQUEST> => action(SpotActions.DELETE_REQUEST)
export const signupSuccess = (id: string): Action<SpotActions.DELETE_SUCCESS> => action(SpotActions.DELETE_SUCCESS, { id })
export const signupFailure = (): Action<SpotActions.DELETE_FAILURE> => action(SpotActions.DELETE_FAILURE)

export const updateRequest = (data: SpotSubmit): Action<SpotActions.UPDATE_REQUEST> => action(SpotActions.UPDATE_REQUEST, data)
export const updateSuccess = (data: Spot): Action<SpotActions.UPDATE_SUCCESS> => action(SpotActions.UPDATE_SUCCESS, { data })
export const updateFailure = (message?: string): Action<SpotActions.UPDATE_FAILURE> => action(SpotActions.UPDATE_FAILURE, { message })
