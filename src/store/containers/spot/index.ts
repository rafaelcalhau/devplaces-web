import { Reducer } from 'redux'
import { SpotActions, SpotsState, Spot } from './types'

const INITIAL_STATE: SpotsState = {
  data: [],
  error: false,
  loading: false,
  verified: false
}

const reducer: Reducer<SpotsState> = (state = INITIAL_STATE, action) => {
  const { type } = action

  switch (type) {
    case SpotActions.CREATE_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      }
    case SpotActions.CREATE_REQUEST:
      return {
        ...state,
        error: false,
        loading: true
      }
    case SpotActions.CREATE_SUCCESS:
      return (function (): SpotsState {
        if (action.payload.data._id) {
          return {
            ...state,
            data: [...state.data, action.payload.data],
            error: false,
            loading: false
          }
        }

        return state
      }())
    case SpotActions.DELETE_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      }
    case SpotActions.DELETE_REQUEST:
      return {
        ...state,
        error: false,
        loading: true
      }
    case SpotActions.DELETE_SUCCESS:
      return (function (): SpotsState {
        if (action.payload) {
          const spots = state.data
          const spotIndex = spots.findIndex(spot => spot._id === action.payload.id)

          if (spotIndex > -1) {
            spots.splice(spotIndex, 1)

            return {
              ...state,
              data: spots,
              error: false,
              loading: false
            }
          } else {
            return state
          }
        }

        return state
      }())
    case SpotActions.LOAD_FAILURE:
      return {
        ...state,
        error: true,
        loading: false,
        verified: true
      }
    case SpotActions.LOAD_REQUEST:
      return {
        ...state,
        error: false,
        loading: true
      }
    case SpotActions.LOAD_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
        error: false,
        loading: false,
        verified: true
      }
    case SpotActions.UPDATE_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      }
    case SpotActions.UPDATE_REQUEST:
      return {
        ...state,
        error: false,
        loading: true
      }
    case SpotActions.UPDATE_SUCCESS:
      return (function (): SpotsState {
        const { data: updated } = action.payload

        if (updated._id) {
          const spots = state.data

          if (!spots.length) {
            return state
          }

          const spotIndex = spots.findIndex(spot => spot._id === updated._id)

          if (spotIndex > -1) {
            const spot = spots.find(spot => spot._id === updated._id)
            const updatedSpot: Spot = {
              _id: updated._id,
              thumbnail: updated.thumbnail.length ? updated.thumbnail : (spot && spot.thumbnail),
              company: updated.company,
              price: updated.price,
              technologies: updated.technologies
            }

            spots.splice(spotIndex, 1)
            spots.splice(spotIndex, 0, updatedSpot)

            return {
              ...state,
              data: spots,
              error: false,
              loading: false
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
