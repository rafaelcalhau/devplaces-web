export interface APICatchError {
  name?: string;
  err?: string | object;
}

export interface ReducerAction {
  type: string;
  payload?: any;
}

export interface ReducerCatchError {
  type: string;
  payload?: APICatchError;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSession {
  id?: string;
  name?: string;
  token?: string;
}

export interface UserState {
  authenticationError?: APICatchError | null;
  data: UserSession;
  isAuthenticating: boolean;
}
