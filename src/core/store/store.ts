import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware, { Saga } from 'redux-saga'
import logger from 'redux-logger'

import settings from '../config/settings.json'
import sagas from './containers/rootSaga'
import bookingsReducer from './containers/bookings'
import spotsReducer from './containers/spot'
import userReducer from './containers/user'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  middleware: (getDefaultMiddleware) => {
    if (settings.dev.logger) {
      return getDefaultMiddleware({ thunk: false }).prepend(logger, sagaMiddleware)
    }

    // for production
    return getDefaultMiddleware({ thunk: false }).prepend(sagaMiddleware)
  },
  reducer: {
    bookings: bookingsReducer,
    spots: spotsReducer,
    user: userReducer
  }
})

sagaMiddleware.run(sagas as Saga<any[]>)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
