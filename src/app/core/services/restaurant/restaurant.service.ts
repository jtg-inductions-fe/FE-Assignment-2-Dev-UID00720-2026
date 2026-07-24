import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Restaurants } from '@src/app/models/restaurant.model';
import { restaurantsUrl } from './restaurant.constants';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient) {}

  getRestaurants() {
    return this.http.get<Restaurants[]>(restaurantsUrl);
  }
}
