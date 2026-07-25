import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Restaurants, AddRestaurant } from '@src/app/models/restaurant.model';
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
    const restaurant: Restaurants = {
      id: String(this.restaurants.length),
      name: newRestaurant.name,
      address: newRestaurant?.address,
      statistics: [],
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
      }
    }
  }
}
