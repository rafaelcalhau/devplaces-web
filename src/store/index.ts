import { combineReducers } from 'redux'
import spotsReducer from './containers/spot'
import userReducer from './containers/user'

const rootReducer = combineReducers({
  spots: spotsReducer,
  user: userReducer
})

export type AppState = ReturnType<typeof rootReducer>
export default rootReducer
