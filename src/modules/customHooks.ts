import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserSession } from 'src/core/store/containers/user/types'
import { loadRequest as loadUserSpots } from 'src/core/store/containers/spot/actions'
import { bookingsRequest } from 'src/core/store/containers/bookings/actions'
import { loginSuccess, userNotStored } from 'src/core/store/containers/user/actions'
import { RootState } from 'src/core/store/store'

export const useStoredUser = (user: UserSession): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    const data = window.localStorage.getItem('devplaces-user')

    if (data !== null) {
      const userData = JSON.parse(data)
      dispatch(loginSuccess(userData))
    } else {
      dispatch(userNotStored())
    }
  }, [dispatch, user.id])
}

export const useLoadBookings = (approved: boolean | null): void => {
  const dispatch = useDispatch()
  const { id, token } = useSelector((state: RootState) => state.user.data)

  useEffect(() => {
    dispatch(bookingsRequest(approved, id, token))
  }, [])
}

export const useLoadSpots = (): void => {
  const dispatch = useDispatch()
  const spots = useSelector((state: RootState) => state.spots)
  const token = useSelector((state: RootState) => state.user.data.token)

  useEffect(() => {
    if (!spots.loading && !spots.verified && spots.data.length === 0) {
      dispatch(loadUserSpots(token))
    }
  }, [])
}
