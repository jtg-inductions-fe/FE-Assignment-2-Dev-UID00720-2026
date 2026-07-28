import { Component } from '@angular/core';
import { ROUTES } from '@core/routes.constants';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.scss'],
})
export class AddRestaurantComponent {
  restaurantUrl = ROUTES.RESTAURANT.RESTAURANTS;
}
