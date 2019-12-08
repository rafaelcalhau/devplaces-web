export interface ActionApprovalRequest {
  type: string;
  payload: {
    approved: boolean;
    bookingId: string;
    spotId: string;
    userId: string;
    token: string;
  };
}

export interface ActionLoadBookings {
  type: string;
  payload: {
    approved: boolean|null;
    id: string;
    token: string;
  };
}

export interface Booking {
  _id: string;
  date: string;
  spot: {
    _id: string;
    company: string;
  };
  user: {
    name: string;
  };
}

export enum BookingsActions {
  APPROVAL_REQUEST = '@bookings/APPROVAL_REQUEST',
  APPROVAL_SUCCESS = '@bookings/APPROVAL_SUCCESS',
  APPROVAL_FAILURE = '@bookings/APPROVAL_FAILURE',
  LOAD = '@bookings/LOAD',
  LOAD_SUCCESS = '@bookings/LOAD_SUCCESS',
  LOAD_FAILURE = '@bookings/LOAD_FAILURE',
  NEW_REQUEST = '@bookings/NEW_REQUEST'
}

interface BookingAproval {
  id: string;
  approved: boolean|null;
  result: boolean|null;
}

export interface BookingsState {
  approvals: BookingAproval[];
  data: Booking[];
  error: boolean;
  loading: boolean;
}
