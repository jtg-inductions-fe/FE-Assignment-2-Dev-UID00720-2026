import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { RestaurantComponent } from './restaurant.component';
import { SharedModule } from '@src/app/shared/shared.module';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';

@NgModule({
  declarations: [
    RestaurantComponent,
    AddRestaurantComponent,
    EditRestaurantComponent,
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    SharedModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class RestaurantModule {}
