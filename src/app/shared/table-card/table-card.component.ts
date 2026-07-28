import { Component, Input } from '@angular/core';
import { DisplayRestaurant } from '@src/app/core/models/restaurant.model';
import { ROUTES } from '@core/routes.constants';
@Component({
  selector: 'app-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss'],
})
export class TableCardComponent {
  editRestaurantUrl = ROUTES.RESTAURANT.EDIT;
  displayedColumns: string[] = [
    'Restaurant Name',
    'Address',
    'Owners',
    'Actions',
  ];
  @Input() dataSource: DisplayRestaurant[] = [];
}
