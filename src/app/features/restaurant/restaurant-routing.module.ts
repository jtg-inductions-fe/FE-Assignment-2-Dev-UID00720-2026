import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RestaurantComponent } from './restaurant.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { ROUTES } from '@core/routes.constants';

const routes: Routes = [
  {
    path: '',
    component: RestaurantComponent,
  },
  {
    path: ROUTES.RESTAURANT.ADD,
    component: AddRestaurantComponent,
  },
  {
    path: ROUTES.RESTAURANT.EDIT + '/:id',
    component: EditRestaurantComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule {}
