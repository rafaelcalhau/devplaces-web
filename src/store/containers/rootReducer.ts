import { combineReducers } from 'redux'
import spotReducer from './spot'
import userReducer from './user'

export default combineReducers({
  spot: spotReducer,
  user: userReducer
})
