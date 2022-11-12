export interface ActionDeletePayload {
  id: string
  token: string
  userid: string
}

export interface ActionDelete {
  type: string
  payload: ActionDeletePayload
}

export interface ActionLoad {
  type: string
  payload: {
    token: string
  }
}

export interface ActionSubmit {
  type: string
  payload: SpotSubmit
}

export enum SpotActions {
  CREATE_REQUEST = '@spot/CREATE_REQUEST',
  CREATE_SUCCESS = '@spot/CREATE_SUCCESS',
  CREATE_FAILURE = '@spot/CREATE_FAILURE',
  DELETE_REQUEST = '@spot/DELETE_REQUEST',
  DELETE_SUCCESS = '@spot/DELETE_SUCCESS',
  DELETE_FAILURE = '@spot/DELETE_FAILURE',
  LOAD_REQUEST = '@spot/LOAD_REQUEST',
  LOAD_SUCCESS = '@spot/LOAD_SUCCESS',
  LOAD_FAILURE = '@spot/LOAD_FAILURE',
  UPDATE_REQUEST = '@spot/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@spot/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@spot/UPDATE_FAILURE'
}

export interface Spot {
  _id: string
  company: string
  price: number
  thumbnail: string
  technologies: string[]
}

export interface SpotSubmit {
  data: FormData
  id?: string
  token: string
  userid: string
}

export interface SpotsState {
  data: Spot[]
  error: boolean
  errorMessage: string
  loading: boolean
  verified: boolean
}
