import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from '@core/components/header/header.component';
import { SideNavComponent } from '@core/components/side-nav/side-nav.component';
import { FailurePageComponent } from '@core/components/failure-page/failure-page.component';

@NgModule({
  declarations: [HeaderComponent, SideNavComponent, FailurePageComponent],
  imports: [CommonModule, MatButtonModule, RouterLink],
  exports: [HeaderComponent, SideNavComponent],
})
export class CoreModule {}
