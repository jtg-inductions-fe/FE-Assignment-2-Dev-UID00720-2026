import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { ListCardComponent } from './list-card/list-card.component';
import { TableCardComponent } from './table-card/table-card.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    UserAvatarComponent,
    StatisticsComponent,
    ListCardComponent,
    TableCardComponent,
    RestaurantFormComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    RouterLink,
    MatChipsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    UserAvatarComponent,
    StatisticsComponent,
    ListCardComponent,
    TableCardComponent,
    RestaurantFormComponent,
    FooterComponent,
  ],
})
export class SharedModule {}
