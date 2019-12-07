import { action } from 'typesafe-actions'
import { Booking, BookingsActions } from './types'

export const bookingsRequest = (approved: boolean|null, id: string, token: string) => action(BookingsActions.LOAD, { approved, id, token })
export const bookingsSuccess = (data: Booking[]) => action(BookingsActions.LOAD_SUCCESS, { data })
export const bookingsFailure = () => action(BookingsActions.LOAD_FAILURE)
