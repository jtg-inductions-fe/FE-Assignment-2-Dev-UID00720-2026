import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { HeaderComponent } from '@core/components/header/header.component';
import { SideNavComponent } from '@core/components/side-nav/side-nav.component';
import { FailurePageComponent } from '@core/components/failure-page/failure-page.component';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '@shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [HeaderComponent, SideNavComponent, FailurePageComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    SharedModule,
    MatIconModule,
    MatDividerModule,
    MatTreeModule,
    RouterModule.forRoot([]),
    RouterLink,
  ],
  exports: [HeaderComponent, SideNavComponent],
})
export class CoreModule {}
