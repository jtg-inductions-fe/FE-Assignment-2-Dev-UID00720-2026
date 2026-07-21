import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatButtonModule } from '@angular/material/button';
import { FailurePageComponent } from '@core/components/failure-page/failure-page.component';
import { MatMenuModule } from '@angular/material/menu';
import { SharedModule } from '@/shared/shared.module';

@NgModule({
  declarations: [HeaderComponent, SideNavComponent, FailurePageComponent],
  imports: [CommonModule, MatButtonModule, MatMenuModule, SharedModule],
  exports: [HeaderComponent, SideNavComponent],
})
export class CoreModule {}
