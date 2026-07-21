import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import data from './failure-page-data.json';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './failure-page.component.html',
  styleUrls: ['./failure-page.component.scss'],
})
export class FailurePageComponent {
  router = inject(Router);

  pageNotFoundHeading = data.pageNotFound.heading;
  errorHeading = data.errorPage.heading;
  pageNotFoundPara = data.pageNotFound.desc;
  errorPara = data.errorPage.desc;
  pageNotFoundImg = data.pageNotFound.img;
  errorImg = data.errorPage.img;

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
