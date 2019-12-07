import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserSession } from '../store/containers/user/types'
import { loadRequest as loadUserSpots } from '../store/containers/spot/actions'
import { bookingsRequest } from '../store/containers/bookings/actions'
import { loginSuccess, userNotStored } from '../store/containers/user/actions'
import { AppState } from '../store'

export const useStoredUser = (user: UserSession): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.id) {
      const data = window.localStorage.getItem('devplaces-user')

      if (data) {
        const userData = JSON.parse(data)
        dispatch(loginSuccess(userData))
      } else {
        dispatch(userNotStored())
      }
    }
  }, [dispatch, user.id])
}

export const useLoadBookings = (approved: boolean|null): void => {
  const dispatch = useDispatch()
  const { id, token } = useSelector((state: AppState) => state.user.data)

  useEffect(() => {
    dispatch(bookingsRequest(approved, id, token))
    // eslint-disable-next-line
  }, [])
}

export const useLoadSpots = (): void => {
  const dispatch = useDispatch()
  const spots = useSelector((state: AppState) => state.spots)
  const token = useSelector((state: AppState) => state.user.data.token)

  useEffect(() => {
    if (!spots.loading && !spots.verified && !spots.data.length) {
      dispatch(loadUserSpots(token))
    }
    // eslint-disable-next-line
  }, [])
}
