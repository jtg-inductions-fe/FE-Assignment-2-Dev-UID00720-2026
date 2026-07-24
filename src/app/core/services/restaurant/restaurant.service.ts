import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Restaurants } from '@src/app/models/restaurant.model';
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

  addRestaurant(): void {
    this.restaurants.push();
  }
}
