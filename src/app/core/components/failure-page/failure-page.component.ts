import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { data } from './faliure-page.constants';

@Component({
  selector: 'app-failure-page',
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
  isErrorRoute = this.router.url === '/error';
}
