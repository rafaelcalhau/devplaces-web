import { combineReducers } from 'redux'
import spotsReducer from './reducers/spots'
import userReducer from './reducers/user'

const rootReducer = combineReducers({
  spots: spotsReducer,
  user: userReducer
})

export type AppState = ReturnType<typeof rootReducer>
export default rootReducer
