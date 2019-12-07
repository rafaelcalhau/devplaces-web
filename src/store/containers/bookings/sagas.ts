import { call, put } from 'redux-saga/effects'
import { bookingsFailure, bookingsSuccess } from './actions'
import { ActionLoadBookings } from './types'
import api from '../../../services/apiclient'

export function * load (action: ActionLoadBookings) {
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
