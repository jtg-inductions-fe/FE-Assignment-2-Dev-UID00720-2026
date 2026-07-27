import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ERROR_PAGE_TEXT, PAGE_NOT_FOUND_TEXT } from './faliure-page.constants';

@Component({
  selector: 'app-failure-page',
  templateUrl: './failure-page.component.html',
  styleUrls: ['./failure-page.component.scss'],
})
export class FailurePageComponent {
  isErrorRoute = this.router.url === '/error';

  readonly PAGE_NOT_FOUND_TEXT = PAGE_NOT_FOUND_TEXT;
  readonly ERROR_PAGE_TEXT = ERROR_PAGE_TEXT;

  constructor(private router: Router) {}
}
