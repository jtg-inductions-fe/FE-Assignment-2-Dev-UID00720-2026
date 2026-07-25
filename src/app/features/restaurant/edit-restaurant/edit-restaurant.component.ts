import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '@src/app/core/services/restaurant/restaurant.service';
import { Restaurants } from '@src/app/core/models/restaurant.model';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.scss'],
})
export class EditRestaurantComponent implements OnInit {
  id!: string;
  restaurant!: Restaurants | null;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.restaurant = this.restaurantService.getOneRestaurant(this.id);
  }
}
