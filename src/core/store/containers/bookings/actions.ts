import { Action, action } from 'typesafe-actions'
import { Booking, BookingsActions } from './types'

export const approvalRequest = (
  approved: boolean,
  bookingId: string,
  spotId: string,
  userId: string,
  token: string
): Action<BookingsActions.APPROVAL_REQUEST> =>
  action(BookingsActions.APPROVAL_REQUEST, { approved, bookingId, spotId, userId, token })

export const approvalSuccess = (
  id: string,
  approved: boolean
): Action<BookingsActions.APPROVAL_SUCCESS> =>
  action(BookingsActions.APPROVAL_SUCCESS, { id, approved })

export const approvalFailure = (
  id: string
): Action<BookingsActions.LOAD_FAILURE> =>
  action(BookingsActions.LOAD_FAILURE, { id })

export const bookingsRequest = (
  approved: boolean | null,
  id: string,
  token: string
): Action<BookingsActions.LOAD> =>
  action(BookingsActions.LOAD, { approved, id, token })

export const bookingsSuccess = (
  data: Booking[]
): Action<BookingsActions.LOAD_SUCCESS> =>
  action(BookingsActions.LOAD_SUCCESS, { data })

export const bookingsFailure = (): Action<BookingsActions.LOAD_FAILURE> =>
  action(BookingsActions.LOAD_FAILURE)

export const newBookingRequest = (data: Booking): Action<BookingsActions.NEW_REQUEST> =>
  action(BookingsActions.NEW_REQUEST, { data })
