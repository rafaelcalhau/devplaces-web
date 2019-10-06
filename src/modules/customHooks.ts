import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { UserSession } from '../store/types/user'

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
