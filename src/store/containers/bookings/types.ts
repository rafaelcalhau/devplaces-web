export interface ActionLoadBookings {
  type: string;
  payload: {
    approved: boolean;
    id: string;
    token: string;
  };
}

export interface Booking {
  _id: string;
  date: string;
  spot: {
    company: string;
  };
  user: {
    name: string;
  };
}

export enum BookingsActions {
  LOAD = '@bookings/LOAD',
  LOAD_SUCCESS = '@bookings/LOAD_SUCCESS',
  LOAD_FAILURE = '@bookings/LOAD_FAILURE'
}

export interface BookingsState {
  data: Booking[];
  error: boolean;
  loading: boolean;
}
