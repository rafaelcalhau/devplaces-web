import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserSession } from '../store/types/user'
import { loadUserSpots } from '../store/actions/spots'
import { AppState } from '../store'

export const useStoredUser = (user: UserSession, actionSuccess: Function): void => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.id) {
      let data = window.localStorage.getItem('devplaces-user')

      if (data) {
        data = JSON.parse(data)
        dispatch(actionSuccess(data))
      }
    }
  }, [actionSuccess, dispatch, user.id])
}

export const useLoadSpots = (): void => {
  const dispatch = useDispatch()
  const spots = useSelector((state: AppState) => state.spots)
  const token = useSelector((state: AppState) => state.user.data.token)

  useEffect(() => {
    if (!spots.data.length) {
      dispatch(loadUserSpots(token))
    }
  }, [dispatch, spots.data, token])
}
