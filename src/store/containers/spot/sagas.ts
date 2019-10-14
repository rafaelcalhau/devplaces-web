import { call, put } from 'redux-saga/effects'
import { ActionDelete, ActionLoad, ActionSubmit } from './types'
import api from '../../../services/apiclient'
import {
  createFailure,
  createSuccess,
  deleteFailure,
  deleteSuccess,
  loadFailure,
  loadSuccess,
  updateFailure,
  updateSuccess
} from './actions'

export function * remove (action: ActionDelete) {
  const { id, token, userid } = action.payload

  try {
    const response = yield call(api.delete, `/spots/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
        userid
      }
    })

    if (response.data.deleted.ok) {
      yield put(deleteSuccess(id))
    } else {
      yield put(deleteFailure())
    }
  } catch {
    yield put(deleteFailure())
  }
}

export function * load (action: ActionLoad) {
  const { token } = action.payload

  try {
    const response = yield call(api.get, '/spots', {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    yield put(loadSuccess(response.data))
  } catch {
    yield put(loadFailure())
  }
}

export function * submit (action: ActionSubmit) {
  const { data, token, userid } = action.payload

  try {
    const response = yield call(api.post, '/spots', data, {
      headers: {
        authorization: `Bearer ${token}`,
        userid
      }
    })
    yield put(createSuccess(response.data))
  } catch {
    yield put(createFailure())
  }
}

export function * update (action: ActionSubmit) {
  const { id, data, token, userid } = action.payload

  try {
    const response = yield call(api.put, `/spots/${id}`, data, {
      headers: {
        authorization: `Bearer ${token}`,
        userid
      }
    })
    yield put(updateSuccess(response.data))
  } catch {
    yield put(updateFailure())
  }
}
