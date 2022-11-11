import { call, put } from 'redux-saga/effects'
import { ActionLogin, ActionSignup, ActionUpdate, UserSession } from './types'
import { GeneratorResponse } from 'src/core/interfaces/generator-response'
import api from 'src/services/apiclient'
import {
  loginFailure,
  loginSuccess,
  signupFailure,
  signupSuccess,
  updateFailure,
  updateSuccess
} from './actions'

export function * login (action: ActionLogin): Generator<any, any, GeneratorResponse<UserSession>> {
  const data = action.payload

  try {
    const { data: response }: GeneratorResponse<UserSession> = yield call(api.post, '/authenticate', {
      email: data.email,
      password: data.password
    })
    if (response != null) yield put(loginSuccess(response))
  } catch {
    yield put(loginFailure())
  }
}

export function * signup (action: ActionSignup): Generator<any, any, GeneratorResponse<UserSession>> {
  const data = action.payload

  try {
    const { data: response }: GeneratorResponse<UserSession> = yield call(api.post, '/users', data)
    if (response != null) yield put(signupSuccess(response))
  } catch {
    yield put(signupFailure())
  }
}

export function * update (action: ActionUpdate): Generator<any, any, GeneratorResponse<{ ok: boolean }>> {
  const { id, token, name, email } = action.payload
  const headers = { authorization: `Bearer ${token}` }

  try {
    const { data: response }: GeneratorResponse<{ ok: boolean }> =
      yield call(api.put, `/users/${id}`, { name, email }, { headers })

    if (response?.ok !== undefined) {
      yield put(updateSuccess(email, name))
    } else {
      yield put(updateFailure())
    }
  } catch {
    yield put(updateFailure())
  }
}
