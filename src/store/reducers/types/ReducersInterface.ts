export interface Action {
  type: string;
  payload: any;
}

export interface UserState {
  data: {
    id?: string;
    name?: string;
    token?: string;
  };
  isAuthenticating: boolean;
}
