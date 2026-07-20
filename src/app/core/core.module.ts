import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatButtonModule } from '@angular/material/button';
import { FailurePageComponent } from './components/failure-page/failure-page.component';

@NgModule({
  declarations: [HeaderComponent, SideNavComponent, FailurePageComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [HeaderComponent, SideNavComponent],
})
export class CoreModule {}
