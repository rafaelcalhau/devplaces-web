export type BookingRequest = {
  _id: string;
  date: string;
  spot: {
    company: string;
  };
  user: {
    name: string;
  };
}
