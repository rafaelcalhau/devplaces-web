import { all, takeLatest } from 'redux-saga/effects'

import { BookingsActions } from './bookings/types'
import { SpotActions } from './spot/types'
import { UserActions } from './user/types'

import * as BookingsSagas from './bookings/sagas'
import * as SpotSagas from './spot/sagas'
import * as UserSagas from './user/sagas'

export default function * rootSaga () {
  return yield all([
    takeLatest(BookingsActions.APPROVAL_REQUEST, BookingsSagas.approval),
    takeLatest(BookingsActions.LOAD, BookingsSagas.load),
    takeLatest(SpotActions.CREATE_REQUEST, SpotSagas.submit),
    takeLatest(SpotActions.DELETE_REQUEST, SpotSagas.remove),
    takeLatest(SpotActions.LOAD_REQUEST, SpotSagas.load),
    takeLatest(SpotActions.UPDATE_REQUEST, SpotSagas.update),
    takeLatest(UserActions.LOGIN_REQUEST, UserSagas.login),
    takeLatest(UserActions.SIGNUP_REQUEST, UserSagas.signup),
    takeLatest(UserActions.UPDATE_REQUEST, UserSagas.update)
  ])
}
