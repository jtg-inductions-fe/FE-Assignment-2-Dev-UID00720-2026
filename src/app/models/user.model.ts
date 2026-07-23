export enum UserRole {
  Admin = 'admin',
  RestaurantOwner = 'restaurant-owner',
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  profileUrl: string;
}

export interface UserApiResponse {
  status: boolean;
  message: string;
}

export interface LoggedInDeatils {
  status: boolean;
  name?: string;
  email?: string;
  role?: string;
  profileUrl?: string;
}
