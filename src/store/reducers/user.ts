import { ReducerAction } from '../types/store'
import { UserState } from '../types/user'

const INITIAL_STATE: UserState = {
  authenticationError: null,
  data: {},
  isAuthenticating: false
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
      return {
        ...state,
        authenticationError: null,
        data: { ...action.payload },
        isAuthenticating: false
      }
    default:
      return state
  }
}

export default reducer
