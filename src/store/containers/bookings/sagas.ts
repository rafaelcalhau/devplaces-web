import { call, put } from 'redux-saga/effects'
import { approvalSuccess, approvalFailure, bookingsFailure, bookingsSuccess } from './actions'
import { ActionApprovalRequest, ActionLoadBookings } from './types'
import api from '../../../services/apiclient'

export function * approval (action: ActionApprovalRequest) {
  const { approved, bookingId, spotId, userId, token } = action.payload

  try {
    const response = yield call(api.put, `/spots/${spotId}/bookings/${bookingId}`, { approved }, {
      headers: {
        authorization: `Bearer ${token}`,
        userid: userId
      }
    })

    if (response.status === 200) {
      yield put(approvalSuccess(bookingId, response.data.approved))
    } else {
      yield put(approvalFailure(bookingId))
    }
  } catch (e) {
    console.log('*** exception*', e)
    yield put(approvalFailure(bookingId))
  }
}

export function * load (action: ActionLoadBookings) {
  const { approved, id, token } = action.payload

  try {
    const response = yield call(api.get, `/users/${id}/bookings/?approved=${approved}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })

    if (response.status === 200) {
      yield put(bookingsSuccess(response.data))
    } else {
      yield put(bookingsFailure())
    }
  } catch {
    yield put(bookingsFailure())
  }
}
