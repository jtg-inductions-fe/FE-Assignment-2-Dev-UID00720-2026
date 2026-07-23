import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

import { UserAvatarComponent } from './user-avatar/user-avatar.component';

@NgModule({
  declarations: [UserAvatarComponent],
  imports: [CommonModule, NgOptimizedImage],
  exports: [UserAvatarComponent],
})
export class SharedModule {}
