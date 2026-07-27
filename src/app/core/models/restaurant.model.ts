export interface Statistics {
  dataName: string;
  dataValue: string;
  dataIcon: string;
  dataIconBgColor: string;
  dataIconColor: string;
}

export interface RestaurantCustomer {
  name: string;
  email: string;
  totalPurchase: number;
  profileUrl: string;
}

export interface Dish {
  name: string;
  restaurant: string;
  totalOrder: number;
}

export interface Restaurants {
  id: string;
  name: string;
  address?: string;
  statistics: Statistics[];
  ownersEmail: string[];
  topCustomers: RestaurantCustomer[];
  topSellingDishes: Dish[];
}

export interface DisplayRestaurant {
  id: string;
  name: string;
  address?: string;
  owners: string[];
}

export interface AddRestaurant {
  name: string;
  address?: string;
  owners: string[];
}
