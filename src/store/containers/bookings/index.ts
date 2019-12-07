import { Reducer } from 'redux'
import { BookingsActions, BookingsState } from './types'

const INITIAL_STATE: BookingsState = {
  data: [],
  error: false,
  loading: false
}

const reducer: Reducer<BookingsState> = (state = INITIAL_STATE, action) => {
  const { type } = action

  switch (type) {
    case BookingsActions.LOAD:
      return {
        ...state,
        error: false,
        loading: true
      }
    case BookingsActions.LOAD_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      }
    case BookingsActions.LOAD_SUCCESS:
      return {
        ...state,
        data: [...action.payload.data],
        error: false,
        loading: false
      }
    default:
      return state
  }
}

export default reducer
