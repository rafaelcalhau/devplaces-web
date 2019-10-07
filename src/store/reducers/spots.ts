import { ReducerAction } from '../types/store'
import { SpotsState } from '../types/spots'

const INITIAL_STATE: SpotsState = {
  data: [],
  error: null,
  loading: false,
  submitted: false,
  submitting: false,
  verified: false
}

const reducer = (state = INITIAL_STATE, action: ReducerAction): SpotsState => {
  const { type } = action

  switch (type) {
    case 'LOAD_SPOTS_FAILED':
      return {
        ...state,
        error: {
          name: action.payload.name,
          err: action.payload.data
        },
        loading: false,
        verified: true
      }
    case 'LOAD_SPOTS_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'LOAD_SPOTS_SUCCESS':
      return {
        ...state,
        error: null,
        data: action.payload,
        loading: false,
        verified: true
      }
    case 'LOGOUT':
      return {
        ...INITIAL_STATE
      }
    case 'SUBMIT_SPOT_FAILED':
      return {
        ...state,
        error: {
          name: action.payload.name,
          err: action.payload.data
        },
        submitting: false
      }
    case 'SUBMIT_SPOT_REQUEST':
      return {
        ...state,
        submitted: false,
        submitting: true
      }
    case 'SUBMIT_SPOT_SUCCESS':
      return {
        ...state,
        data: [...state.data, action.payload],
        submitted: true,
        submitting: false
      }
    default:
      return state
  }
}

export default reducer
