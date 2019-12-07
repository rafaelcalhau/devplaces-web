import { call, put } from 'redux-saga/effects'
import { ActionLoadBookings, ActionLogin, ActionSignup, ActionUpdate } from './types'
import api from '../../../services/apiclient'
import {
  bookingsFailure,
  bookingsSuccess,
  loginFailure,
  loginSuccess,
  signupFailure,
  signupSuccess,
  updateFailure,
  updateSuccess
} from './actions'

export function * bookings (action: ActionLoadBookings) {
  const { approved, id, token } = action.payload

  try {
    const response = yield call(api.get, `/users/${id}/bookings/?approved=${approved}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    yield put(bookingsSuccess(response.data))
  } catch {
    yield put(bookingsFailure())
  }
}

export function * login (action: ActionLogin) {
  const data = action.payload

  try {
    const response = yield call(api.post, '/authenticate', {
      email: data.email,
      password: data.password
    })
    yield put(loginSuccess(response.data))
  } catch {
    yield put(loginFailure())
  }
}

export function * signup (action: ActionSignup) {
  const data = action.payload

  try {
    const response = yield call(api.post, '/users', data)
    yield put(signupSuccess(response.data))
  } catch {
    yield put(signupFailure())
  }
}

export function * update (action: ActionUpdate) {
  const { id, token, name, email } = action.payload

  try {
    const response = yield call(api.put, `/users/${id}`, {
      name, email
    }, {
      headers: { authorization: `Bearer ${token}` }
    })

    if (response.data.ok) {
      yield put(updateSuccess(email, name))
    } else {
      yield put(updateFailure())
    }
  } catch {
    yield put(updateFailure())
  }
}
