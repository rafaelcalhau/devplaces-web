import { action } from 'typesafe-actions'
import { Booking, BookingsActions } from './types'

export const approvalRequest = (approved: boolean, bookingId: string, spotId: string, userId: string, token: string) => action(BookingsActions.APPROVAL_REQUEST, { approved, bookingId, spotId, userId, token })
export const approvalSuccess = (id: string, approved: boolean) => action(BookingsActions.APPROVAL_SUCCESS, { id, approved })
export const approvalFailure = (id: string) => action(BookingsActions.LOAD_FAILURE, { id })

export const bookingsRequest = (approved: boolean|null, id: string, token: string) => action(BookingsActions.LOAD, { approved, id, token })
export const bookingsSuccess = (data: Booking[]) => action(BookingsActions.LOAD_SUCCESS, { data })
export const bookingsFailure = () => action(BookingsActions.LOAD_FAILURE)

export const newBookingRequest = (data: Booking) => action(BookingsActions.NEW_REQUEST, { data })
