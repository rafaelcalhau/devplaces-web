import { ReducerAction } from '../types/store'
import { SpotsState } from '../types/spots'

const INITIAL_STATE: SpotsState = {
  data: [],
  error: null,
  loading: false,
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
    default:
      return state
  }
}

export default reducer
