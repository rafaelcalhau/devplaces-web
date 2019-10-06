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

export interface UserState {
  authenticationError?: APICatchError | null;
  data: UserSession;
  isAuthenticating: boolean;
  isLocalStorageChecked: boolean;
}
