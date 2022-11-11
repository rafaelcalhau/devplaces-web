import { call, put } from 'redux-saga/effects'
import api from 'src/services/apiclient'
import { GeneratorResponse } from 'src/core/interfaces/generator-response'
import { approvalSuccess, approvalFailure, bookingsFailure, bookingsSuccess } from './actions'
import { ActionApprovalRequest, ActionLoadBookings, Booking } from './types'

interface BookingsSagaApproval {
  id: string
  approved: boolean
}

export function * approval (action: ActionApprovalRequest): Generator<any, any, GeneratorResponse<BookingsSagaApproval>> {
  const { approved, bookingId, spotId, userId, token } = action.payload

  try {
    const { data: response, status }: GeneratorResponse<BookingsSagaApproval> =
      yield call(api.put, `/spots/${spotId}/bookings/${bookingId}`, { approved }, {
        headers: { authorization: `Bearer ${token}`, userid: userId }
      })

    if (response !== undefined && status === 200) {
      yield put(approvalSuccess(bookingId, response.approved))
    } else {
      yield put(approvalFailure(bookingId))
    }
  } catch (e) {
    yield put(approvalFailure(bookingId))
  }
}

export function * load (action: ActionLoadBookings): Generator<any, any, GeneratorResponse<Booking[]>> {
  const { approved, id, token } = action.payload

  try {
    const { data: response, status }: GeneratorResponse<Booking[]> =
      yield call(api.get, `/users/${id}/bookings/?approved=${String(approved)}`, {
        headers: { authorization: `Bearer ${token}` }
      })

    if (response !== undefined && status === 200) {
      yield put(bookingsSuccess(response))
    } else {
      yield put(bookingsFailure())
    }
  } catch {
    yield put(bookingsFailure())
  }
}
