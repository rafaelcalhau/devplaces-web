import { action } from 'typesafe-actions'
import { ActionDeletePayload, SpotActions, Spot, SpotSubmit } from './../spot/types'

export const createRequest = (data: SpotSubmit) => action(SpotActions.CREATE_REQUEST, data)
export const createSuccess = (data: Spot) => action(SpotActions.CREATE_SUCCESS, { data })
export const createFailure = () => action(SpotActions.CREATE_FAILURE)

export const deleteRequest = (data: ActionDeletePayload) => action(SpotActions.DELETE_REQUEST, data)
export const deleteSuccess = (id: string) => action(SpotActions.DELETE_SUCCESS, { id })
export const deleteFailure = () => action(SpotActions.DELETE_FAILURE)

export const loadRequest = (token: string) => action(SpotActions.LOAD_REQUEST, { token })
export const loadSuccess = (data: Spot[]) => action(SpotActions.LOAD_SUCCESS, { data })
export const loadFailure = () => action(SpotActions.LOAD_FAILURE)

export const signupRequest = () => action(SpotActions.DELETE_REQUEST)
export const signupSuccess = (id: string) => action(SpotActions.DELETE_SUCCESS, { id })
export const signupFailure = () => action(SpotActions.DELETE_FAILURE)

export const updateRequest = (data: SpotSubmit) => action(SpotActions.UPDATE_REQUEST, data)
export const updateSuccess = (data: Spot) => action(SpotActions.UPDATE_SUCCESS, { data })
export const updateFailure = () => action(SpotActions.UPDATE_FAILURE)
