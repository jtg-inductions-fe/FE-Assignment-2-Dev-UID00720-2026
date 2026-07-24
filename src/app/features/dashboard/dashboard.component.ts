import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '@core/services/auth/auth.service';
import { RestaurantService } from '@core/services/restaurant/restaurant.service';
import {
  Restaurants,
  Statistics,
  RestaurantCustomer,
  Dish,
} from '@src/app/models/restaurant.model';
import { ListCardItem } from '@src/app/models/list-card-item';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private restaurantService: RestaurantService
  ) {}

  role = '';
  email = '';
  desc = '';
  selected = '0';

  restaurantsData: Restaurants[] = [];
  statisticsData: Statistics[] = [];
  topCustomers: ListCardItem[] = [];
  topSellingDishes: ListCardItem[] = [];

  private authSubscription!: Subscription;
  private restaurantSubscription!: Subscription;

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      loggedInDeatils => {
        if (loggedInDeatils.role) {
          this.role = loggedInDeatils.role;
          this.desc =
            this.role === 'admin'
              ? 'System administrator overview panel. Impersonate owners or view aggregate metrics.'
              : 'Welcome back, restaurant partner! Track your orders and performance details.';
        }
        this.email = loggedInDeatils.email ? loggedInDeatils.email : '';
      }
    );

    this.restaurantSubscription = this.restaurantService
      .getRestaurants()
      .subscribe({
        next: data => {
          this.restaurantsData = data;

          if (this.role === 'restaurant-owner') {
            this.selected = this.getRestaurantId(this.email);
          }

          this.statisticsData = data[parseInt(this.selected)].statistics;
          const topCustomers = data[parseInt(this.selected)].topCustomers;
          const topSellingDishes =
            data[parseInt(this.selected)].topSellingDishes;
          this.filterData(topCustomers, topSellingDishes);
        },
        error: err => {
          console.error('Error fetching restaurants', err);
        },
      });
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
      this.restaurantSubscription.unsubscribe();
    }
  }

  changeRestaurantData() {
    this.statisticsData =
      this.restaurantsData[parseInt(this.selected)].statistics;
    this.statisticsData =
      this.restaurantsData[parseInt(this.selected)].statistics;
    const topCustomers =
      this.restaurantsData[parseInt(this.selected)].topCustomers;
    const topSellingDishes =
      this.restaurantsData[parseInt(this.selected)].topSellingDishes;
    this.filterData(topCustomers, topSellingDishes);
  }

  filterData(
    topCustomers: RestaurantCustomer[],
    topSellingDishes: Dish[]
  ): void {
    this.topCustomers = topCustomers.map(customer => ({
      image: customer.profileUrl,
      title: customer.name,
      subtitle: customer.email,
      value: customer.totalPurchase,
    }));

    this.topSellingDishes = topSellingDishes.map(dish => ({
      title: dish.name,
      subtitle: dish.restaurant,
      value: dish.totalOrder,
    }));
  }

  getRestaurantId(email: string): string {
    for (const restaurant of this.restaurantsData) {
      if (restaurant.ownersEmail.includes(email)) {
        return restaurant.id;
      }
    }
    return '0';
  }
}
