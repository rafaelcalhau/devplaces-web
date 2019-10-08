import { ReducerAction } from '../types/store'
import { UserState } from '../types/user'

const INITIAL_STATE: UserState = {
  authenticationError: null,
  data: {
    id: null,
    name: null,
    email: null,
    token: null
  },
  isAuthenticating: false,
  isLocalStorageChecked: false,
  signupDone: false,
  signupError: null,
  signupLoading: false,
  updateDone: false,
  updateError: null,
  updateLoading: false
}

const reducer = (state = INITIAL_STATE, action: ReducerAction): UserState => {
  const { type } = action

  switch (type) {
    case 'LOGIN_FAILED':
      return {
        ...state,
        authenticationError: {
          name: action.payload.name,
          err: action.payload.data
        },
        isAuthenticating: false
      }
    case 'LOGIN_REQUEST':
      return {
        ...state,
        isAuthenticating: true
      }
    case 'LOGIN_SUCCESS':
      return (function (): UserState {
        const data = { ...action.payload }
        window.localStorage.setItem('devplaces-user', JSON.stringify(data))

        return {
          ...state,
          authenticationError: null,
          data,
          isAuthenticating: false,
          isLocalStorageChecked: true
        }
      }())
    case 'SIGNUP_FAILED':
      return {
        ...state,
        signupError: {
          name: action.payload.name,
          err: action.payload.data
        },
        signupLoading: false
      }
    case 'SIGNUP_REQUEST':
      return {
        ...state,
        signupDone: false,
        signupLoading: true
      }
    case 'SIGNUP_SUCCESS':
      return {
        ...state,
        signupDone: true,
        signupError: null,
        signupLoading: false
      }
    case 'USER_UPDATE_FAILED':
      return {
        ...state,
        updateError: {
          name: action.payload.name,
          err: action.payload.data
        },
        updateLoading: false
      }
    case 'USER_UPDATE_REQUEST':
      return {
        ...state,
        updateDone: false,
        updateLoading: true
      }
    case 'USER_UPDATE_SUCCESS':
      return {
        ...state,
        data: {
          ...state.data,
          name: action.payload.name,
          email: action.payload.email
        },
        updateDone: true,
        updateError: null,
        updateLoading: false
      }
    case 'LOGOUT':
    case 'USER_NOT_STORED':
      return {
        ...INITIAL_STATE,
        isLocalStorageChecked: true
      }
    default:
      return state
  }
}

export default reducer
