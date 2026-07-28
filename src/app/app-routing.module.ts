import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '@core/guards/auth.guard';
import { ROUTES } from '@core/routes.constants';

import { FailurePageComponent } from '@core/components/failure-page/failure-page.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: ROUTES.AUTH.AUTH + '/' + ROUTES.AUTH.LOGIN,
    pathMatch: 'full',
  },
  {
    path: ROUTES.AUTH.AUTH,
    loadChildren: () =>
      import('@features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: ROUTES.DASHBOARD,
    loadChildren: () =>
      import('@features/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
    canActivate: [authGuard],
  },
  {
    path: ROUTES.RESTAURANT.RESTAURANTS,
    loadChildren: () =>
      import('./features/restaurant/restaurant.module').then(
        m => m.RestaurantModule
      ),
    canActivate: [authGuard],
  },
  { path: '**', component: FailurePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
