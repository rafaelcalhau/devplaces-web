import { call, put } from 'redux-saga/effects'
import { ActionDelete, ActionLoad, ActionSubmit, Spot } from './types'
import { GeneratorResponse } from 'src/core/interfaces/generator-response'
import api from 'src/services/apiclient'
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

interface SpotRemoveSaga {
  deleted: { ok: boolean }
}

export function * remove (action: ActionDelete): Generator<any, any, GeneratorResponse<SpotRemoveSaga>> {
  const { id, token, userid } = action.payload

  try {
    const { data: response }: GeneratorResponse<SpotRemoveSaga> = yield call(api.delete, `/spots/${id}`, {
      headers: { authorization: `Bearer ${token}`, userid }
    })

    if (response?.deleted?.ok !== undefined) {
      yield put(deleteSuccess(id))
    } else {
      yield put(deleteFailure())
    }
  } catch {
    yield put(deleteFailure())
  }
}

export function * load (action: ActionLoad): Generator<any, any, GeneratorResponse<Spot[]>> {
  const { token } = action.payload

  try {
    const { data: response }: GeneratorResponse<Spot[]> = yield call(api.get, '/spots', {
      headers: { authorization: `Bearer ${token}` }
    })
    if (Array.isArray(response)) yield put(loadSuccess(response))
  } catch {
    yield put(loadFailure())
  }
}

export function * submit (action: ActionSubmit): Generator<any, any, GeneratorResponse<Spot>> {
  const { data, token, userid } = action.payload

  try {
    const { data: response }: GeneratorResponse<Spot> = yield call(api.post, '/spots', data, {
      headers: { authorization: `Bearer ${token}`, userid }
    })
    if (response !== undefined) yield put(createSuccess(response))
  } catch {
    yield put(createFailure())
  }
}

export function * update (action: ActionSubmit): Generator<any, any, GeneratorResponse<Spot>> {
  const { id, data, token, userid } = action.payload
  if (id === undefined || id.length === 0) {
    yield put(updateFailure())
    return
  }

  try {
    const { data: response }: GeneratorResponse<Spot> = yield call(api.put, `/spots/${id}`, data, {
      headers: {
        authorization: `Bearer ${token}`,
        userid
      }
    })
    if (response !== undefined) {
      yield put(updateSuccess(response))
    }
  } catch (err) {
    yield put(updateFailure(err.message))
  }
}
