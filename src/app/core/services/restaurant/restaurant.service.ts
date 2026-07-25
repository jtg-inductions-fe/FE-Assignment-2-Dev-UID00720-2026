import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Restaurants,
  AddRestaurant,
  Statistics,
} from '@src/app/models/restaurant.model';
import { restaurantsUrl } from './restaurant.constants';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  restaurants: Restaurants[] = [];

  constructor(private http: HttpClient) {}

  getRestaurants(): Observable<Restaurants[]> {
    if (!this.restaurants.length) {
      return this.http.get<Restaurants[]>(restaurantsUrl).pipe(
        tap((restaurantsData: Restaurants[]) => {
          this.restaurants = restaurantsData;
        })
      );
    }

    return of(this.restaurants);
  }

  addRestaurant(newRestaurant: AddRestaurant): void {
    const restaurantStatistics = this.generateInitialStats();
    restaurantStatistics[3].dataValue = String(newRestaurant.owners.length);

    const restaurant: Restaurants = {
      id: String(this.restaurants.length),
      name: newRestaurant.name,
      address: newRestaurant?.address,
      statistics: restaurantStatistics,
      ownersEmail: newRestaurant.owners,
      topCustomers: [],
      topSellingDishes: [],
    };
    this.restaurants.push(restaurant);
  }

  getOneRestaurant(id: string): Restaurants | null {
    for (const restaurant of this.restaurants) {
      if (restaurant.id === id) {
        return restaurant;
      }
    }
    return null;
  }

  editRestaurant(
    id: string | undefined,
    editRestaurantDetails: AddRestaurant
  ): void {
    if (!id) return;

    for (const restaurant of this.restaurants) {
      if (restaurant.id === id) {
        restaurant.name = editRestaurantDetails.name;
        restaurant.address = editRestaurantDetails.address;
        restaurant.ownersEmail = editRestaurantDetails.owners;
        restaurant.statistics[3].dataValue = String(
          editRestaurantDetails.owners.length
        );
      }
    }
  }

  generateInitialStats(): Statistics[] {
    const restaurantStatistics: Statistics[] = [
      {
        dataName: 'Total Revenue',
        dataValue: '$0',
        dataIcon: 'attach_money',
        dataIconBgColor: '#e8f5e9',
        dataIconColor: '#2e7d32',
      },
      {
        dataName: 'Total Orders',
        dataValue: '0',
        dataIcon: 'receipt_long',
        dataIconBgColor: '#e3f2fd',
        dataIconColor: '#1565c0',
      },
      {
        dataName: 'Completed Orders',
        dataValue: '0',
        dataIcon: 'check_circle',
        dataIconBgColor: '#fff3e0',
        dataIconColor: '#ef6c00',
      },
      {
        dataName: 'Restaurant Owners',
        dataValue: '0',
        dataIcon: 'local_pizza',
        dataIconBgColor: '#f3e5f5',
        dataIconColor: '#7b1fa2',
      },
    ];
    return restaurantStatistics;
  }
}
