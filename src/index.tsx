import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import thunk from 'redux-thunk'

import { dev } from './config/settings.json'
import reducer from './store'
import App from './App'

const store = dev.logger
  ? createStore(reducer, applyMiddleware(logger, thunk))
  : createStore(reducer, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
