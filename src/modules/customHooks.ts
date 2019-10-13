import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserSession } from '../store/types/user'
import { loadUserSpots } from '../store/actions/spots'
import { loginSuccess } from '../store/actions/login'
import { userNotStored } from '../store/actions/user'
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
