import { Reducer } from 'redux'
import { BookingsActions, BookingsState } from './types'

const INITIAL_STATE: BookingsState = {
  approvals: [],
  data: [],
  error: false,
  loading: false
}

const reducer: Reducer<BookingsState> = (state = INITIAL_STATE, action) => {
  const { type } = action

  switch (type) {
    case BookingsActions.APPROVAL_REQUEST:
      return {
        ...state,
        approvals: [
          ...state.approvals.filter(item => item.id !== action.payload.id),
          {
            id: action.payload.bookingId,
            approved: null,
            result: null
          }
        ]
      }
    case BookingsActions.APPROVAL_SUCCESS:
      return (function () {
        const approvalIndex = state.approvals.findIndex(item => item.id === action.payload.id)
        let approval

        if (approvalIndex === -1) {
          return state
        }

        approval = state.approvals[approvalIndex] //eslint-disable-line
        approval.approved = action.payload.approved
        approval.result = true

        return {
          ...state,
          approvals: [
            ...state.approvals.filter(item => item.id !== action.payload.id),
            approval
          ],
          data: [
            ...state.data.filter(item => item._id !== action.payload.id)
          ]
        }
      }())
    case BookingsActions.APPROVAL_FAILURE:
      return (function () {
        const approvalIndex = state.approvals.findIndex(item => item.id === action.payload.id)
        const approval = state.approvals[approvalIndex] //eslint-disable-line

        approval.result = false

        return {
          ...state,
          approvals: [
            ...state.approvals.filter(item => item.id !== action.payload.id),
            approval
          ]
        }
      }())
    case BookingsActions.LOAD:
      return {
        ...state,
        error: false,
        loading: true
      }
    case BookingsActions.LOAD_FAILURE:
      return {
        ...state,
        error: true,
        loading: false
      }
    case BookingsActions.LOAD_SUCCESS:
      return {
        ...state,
        data: [...action.payload.data],
        error: false,
        loading: false
      }
    case BookingsActions.NEW_REQUEST:
      return {
        ...state,
        data: [...state.data, action.payload.data]
      }
    default:
      return state
  }
}

export default reducer
