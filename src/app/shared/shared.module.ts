import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ProfileComponent, StatisticsComponent],
  imports: [CommonModule, MatIconModule],
  exports: [ProfileComponent, StatisticsComponent],
})
export class SharedModule {}
