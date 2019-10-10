import { ReducerAction } from '../types/store'
import { SpotsState, Spot } from '../types/spots'

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
    case 'DELETE_SPOT_FAILED':
      return {
        ...state,
        error: {
          name: action.payload.name,
          err: action.payload.data
        },
        submitting: false
      }
    case 'DELETE_SPOT_REQUEST':
      return {
        ...state,
        submitted: false,
        submitting: true
      }
    case 'DELETE_SPOT_SUCCESS':
      return (function (): SpotsState {
        if (action.payload) {
          const spots = state.data
          const spotIndex = spots.findIndex(spot => spot._id === action.payload)

          if (spotIndex > -1) {
            spots.splice(spotIndex, 1)

            return {
              ...state,
              data: spots,
              submitted: true,
              submitting: false
            }
          } else {
            return state
          }
        }

        return state
      }())
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
      return (function (): SpotsState {
        if (action.payload._id) {
          const spots = state.data
          const spotIndex = spots.findIndex(spot => spot._id === action.payload._id)

          if (spotIndex > -1) {
            // Update Spot

            const spot = spots.find(spot => spot._id === action.payload._id)
            const updatedSpot: Spot = {
              _id: action.payload._id,
              thumbnail: action.payload.thumbnail.length ? action.payload.thumbnail : (spot && spot.thumbnail),
              company: action.payload.company,
              price: action.payload.price,
              technologies: action.payload.technologies
            }

            spots.splice(spotIndex, 1)
            spots.splice(spotIndex, 0, updatedSpot)

            return {
              ...state,
              data: spots,
              submitted: true,
              submitting: false
            }
          } else {
            return {
              ...state,
              data: [...state.data, action.payload],
              submitted: true,
              submitting: false
            }
          }
        }

        return state
      }())
    default:
      return state
  }
}

export default reducer
