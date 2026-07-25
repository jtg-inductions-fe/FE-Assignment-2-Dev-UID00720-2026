import { Component, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { RestaurantService } from '@src/app/core/services/restaurant/restaurant.service';
import { DisplayRestaurant } from '@src/app/core/models/restaurant.model';
import { Restaurants } from '@src/app/core/models/restaurant.model';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnInit, OnDestroy {
  displayRestaurantData: DisplayRestaurant[] = [];
  private restaurantSubscription!: Subscription;

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.restaurantSubscription = this.restaurantService
      .getRestaurants()
      .subscribe({
        next: data => {
          this.displayRestaurantData = this.filterRestaurantData(data);
        },
        error: err => {
          console.error('Error fetching restaurants', err);
        },
      });
  }

  ngOnDestroy(): void {
    this.restaurantSubscription.unsubscribe();
  }

  filterRestaurantData(data: Restaurants[]): DisplayRestaurant[] {
    const res: DisplayRestaurant[] = [];
    for (const restaurant of data) {
      if (restaurant.name === 'All Restaurants') {
        continue;
      }
      res.push({
        id: restaurant.id,
        name: restaurant.name,
        address: restaurant.address,
        owners: restaurant.ownersEmail,
      });
    }
    return res;
  }
}
