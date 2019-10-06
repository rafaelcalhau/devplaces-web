import { ReducerAction } from '../types/store'
import { UserState } from '../types/user'

const INITIAL_STATE: UserState = {
  authenticationError: null,
  data: {
    id: null,
    name: null,
    token: null
  },
  isAuthenticating: false,
  isLocalStorageChecked: false
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
    default:
      return state
  }
}

export default reducer
