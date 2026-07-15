import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  public userLoggedIn = false;
  public userName? = '';
  public userEmail? = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(loginStatus => {
      this.userLoggedIn = loginStatus.status;
      this.userName = loginStatus.name;
      this.userEmail = loginStatus.email;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
