import { APICatchError } from './store'

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSession {
  id: string | null;
  name: string | null;
  token: string | null;
}

export interface UserSignup {
  name: string;
  email: string;
  password: string;
}

export interface UserState {
  authenticationError?: APICatchError | null;
  data: UserSession;
  isAuthenticating: boolean;
  isLocalStorageChecked: boolean;
  signupDone: boolean;
  signupError: APICatchError | null;
  signupLoading: boolean;
}
