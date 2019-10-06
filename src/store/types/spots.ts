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
  error: null | APICatchError;
  loading: boolean;
  verified: boolean;
}
