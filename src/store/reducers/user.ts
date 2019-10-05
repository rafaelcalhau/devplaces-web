import { Action, UserState } from './types/ReducersInterface'

const INITIAL_STATE: UserState = {
  data: {
    id: 'jdjjjowjowjoopopf'
  },
  isAuthenticating: false
}

const reducer = (state = INITIAL_STATE, action: Action): UserState => {
  const { type } = action

  switch (type) {
    case 'LOGIN_REQUEST':
      return {
        ...state,
        data: { ...state.data },
        isAuthenticating: true
      }
    default:
      return state
  }
}

export default reducer
