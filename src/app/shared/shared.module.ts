import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

import { UserAvatarComponent } from './user-avatar/user-avatar.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { ListCardComponent } from './list-card/list-card.component';

@NgModule({
  declarations: [UserAvatarComponent, StatisticsComponent, ListCardComponent],
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
  ],
  exports: [UserAvatarComponent, StatisticsComponent, ListCardComponent],
})
export class SharedModule {}
