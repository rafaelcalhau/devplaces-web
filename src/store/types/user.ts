import { APICatchError } from './store'

export interface UserLogin {
  email: string;
  password: string;
}

export interface UserSession {
  id: string | null;
  name: string | null;
  email: string | null;
  token: string | null;
}

export interface UserSignup {
  name: string|null;
  email: string|null;
  password: string|null;
}

export interface UserState {
  authenticationError?: APICatchError | null;
  data: UserSession;
  isAuthenticating: boolean;
  isLocalStorageChecked: boolean;
  signupDone: boolean;
  signupError: APICatchError | null;
  signupLoading: boolean;
  updateDone: boolean;
  updateError: APICatchError | null;
  updateLoading: boolean;
}

export interface UserUpdated {
  name: string;
  email: string;
}
