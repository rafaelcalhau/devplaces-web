import { combineReducers } from 'redux'
import bookingsReducer from './containers/bookings'
import spotsReducer from './containers/spot'
import userReducer from './containers/user'

const rootReducer = combineReducers({
  bookings: bookingsReducer,
  spots: spotsReducer,
  user: userReducer
})

export type AppState = ReturnType<typeof rootReducer>
export default rootReducer
