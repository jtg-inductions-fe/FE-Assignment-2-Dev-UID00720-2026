import { Component } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { SidenavStateService } from '@core/services/sidenav-state/sidenav-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private sidenavService: SidenavStateService
  ) {}

  isLoggedIn$ = this.authService.isLoggedIn$;
  isSidenavOpen$ = this.sidenavService.isOpen$;
}
