export enum UserRole {
  Admin = 'admin',
  RestaurantOwner = 'restaurant-owner',
}

export interface User {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface UserApiResponse {
  status: boolean;
  message: string;
}
