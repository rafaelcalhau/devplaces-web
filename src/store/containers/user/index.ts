import { Reducer } from 'redux'
import { UserActions, UserState } from './types'

const INITIAL_STATE: UserState = {
  error: false,
  data: {
    id: '',
    name: '',
    email: '',
    token: ''
  },
  loading: false,
  isLocalStorageChecked: false
}

const reducer: Reducer<UserState> = (state = INITIAL_STATE, action) => {
  const { type } = action

  switch (type) {
    case UserActions.LOGIN_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      }
    case UserActions.LOGIN_REQUEST:
      return {
        ...state,
        error: false,
        loading: true
      }
    case UserActions.LOGIN_SUCCESS:
      return (function (): UserState {
        const data = { ...action.payload.data }
        localStorage.setItem('devplaces-user', JSON.stringify(data))

        return {
          ...state,
          data,
          error: false,
          loading: false,
          isLocalStorageChecked: true
        }
      }())
    case UserActions.SIGNUP_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      }
    case UserActions.SIGNUP_REQUEST:
      return {
        ...state,
        error: false,
        loading: true
      }
    case UserActions.SIGNUP_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false
      }
    case UserActions.UPDATE_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      }
    case UserActions.UPDATE_REQUEST:
      return {
        ...state,
        error: false,
        loading: true
      }
    case UserActions.UPDATE_SUCCESS:
      return (function () {
        const { email, name } = action.payload
        const storageItem = localStorage.getItem('devplaces-user')

        if (storageItem) {
          const storedData = JSON.parse(storageItem)

          storedData.email = email
          storedData.name = name

          localStorage.setItem('devplaces-user', JSON.stringify(storedData))
        }

        return {
          ...state,
          data: { ...state.data, email, name },
          error: false,
          loading: false
        }
      }())
    case UserActions.LOGOUT:
    case UserActions.NOT_STORED_LOCALLY:
      localStorage.removeItem('devplaces-user')

      return {
        ...INITIAL_STATE,
        isLocalStorageChecked: true
      }
    default:
      return state
  }
}

export default reducer
