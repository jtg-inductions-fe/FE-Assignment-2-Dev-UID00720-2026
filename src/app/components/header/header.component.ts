import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '@/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  private router = inject(Router);
  private rawUserData = localStorage.getItem('user');
  public userData;
  isLoggedIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {
    if (this.rawUserData !== null) this.userData = JSON.parse(this.rawUserData);
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
