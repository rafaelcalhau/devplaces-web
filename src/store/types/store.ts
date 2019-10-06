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
