import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'

import { dev } from './config/settings.json'
import reducer from './store'
import sagas from './store/containers/rootSaga'
import App from './App'

const sagaMiddleware = createSagaMiddleware()

const store = dev.logger
  ? createStore(reducer, applyMiddleware(logger, sagaMiddleware))
  : createStore(reducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(sagas)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
