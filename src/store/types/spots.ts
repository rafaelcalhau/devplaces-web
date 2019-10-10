import { APICatchError } from './store'

export interface Spot {
  _id: string;
  company: string;
  price: number;
  thumbnail: string;
  technologies: [string];
}

export interface SpotsState {
  data: Array<Spot>;
  deleted: boolean;
  error: null | APICatchError;
  loading: boolean;
  submitted: boolean;
  submitting: boolean;
  updated: boolean;
  verified: boolean;
}
