import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FailurePageComponent } from './core/components/failure-page/failure-page.component';
const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('@features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('@features/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
  },
  { path: '**', component: FailurePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
