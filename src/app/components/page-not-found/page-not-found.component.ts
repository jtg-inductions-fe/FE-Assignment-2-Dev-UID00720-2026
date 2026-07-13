import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss'],
})
export class PageNotFoundComponent {
  public router = inject(Router);

  public pageNotFoundHeading = 'Page not found';
  public errorHeading = 'Something has gone seriously wrong';
  public pageNotFoundPara =
    'Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.';
  public errorPara =
    "It's always time for a coffee break We should be back by the time you finish your coffee.";
  public pageNotFoundImg = 'assets/404.svg';
  public errorImg = 'assets/error-page-img.svg';

  handleClick(): void {
    this.router.navigate(['/dashboard']);
  }
}
