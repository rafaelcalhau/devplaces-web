import { APICatchError } from './store'

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
