import { Component } from '@angular/core';

import { AuthService } from '@core/services/auth/auth.service';
import { SidenavService } from '@core/services/sidenav/sidenav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn$ = this.authService.isLoggedIn$;
  isSidenavOpen$ = this.sidenavService.isOpen$;

  constructor(
    private authService: AuthService,
    private sidenavService: SidenavService
  ) {}
}
