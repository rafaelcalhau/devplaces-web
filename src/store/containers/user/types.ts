export interface ActionLogin {
  type: string;
  payload: UserLogin;
}

export interface ActionSignup {
  type: string;
  payload: UserSignup;
}

export interface ActionUpdate {
  type: string;
  payload: UserSession;
}

export enum UserActions {
  LOGIN_REQUEST = '@user/LOGIN_REQUEST',
  LOGIN_SUCCESS = '@user/LOGIN_SUCCESS',
  LOGIN_FAILURE = '@user/LOGIN_FAILURE',
  LOGOUT = '@user/LOGOUT',
  NOT_STORED_LOCALLY = '@user/NOT_STORED_LOCALLY',
  SIGNUP_REQUEST = '@user/SIGNUP_REQUEST',
  SIGNUP_SUCCESS = '@user/SIGNUP_SUCCESS',
  SIGNUP_FAILURE = '@user/SIGNUP_FAILURE',
  UPDATE_REQUEST = '@user/UPDATE_REQUEST',
  UPDATE_SUCCESS = '@user/UPDATE_SUCCESS',
  UPDATE_FAILURE = '@user/UPDATE_FAILURE',
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface UserSignup {
  name: string;
  email: string;
  password: string;
}

export interface UserState {
  error: boolean;
  data: UserSession;
  loading: boolean;
  isLocalStorageChecked: boolean;
}
