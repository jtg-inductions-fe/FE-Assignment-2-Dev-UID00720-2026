import { Component, OnInit } from '@angular/core';
import { AuthService } from '@core/services/auth/auth.service';
import { Router } from '@angular/router';
import { SidenavService } from '@src/app/core/services/sidenav/sidenav.service';
import { ROUTES } from '@core/routes.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userLoggedIn = false;
  userName = '';
  userEmail = '';
  profileUrl = '';
  dashboardUrl = ROUTES.DASHBOARD;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sidenavService: SidenavService
  ) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(loginStatus => {
      const {
        status = false,
        name = '',
        email = '',
        profileUrl = '',
      } = loginStatus || {};

      this.userLoggedIn = status;
      this.userName = name;
      this.userEmail = email;
      this.profileUrl = profileUrl;

      if (!this.userLoggedIn) {
        this.router.navigate(['/']);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }
}
