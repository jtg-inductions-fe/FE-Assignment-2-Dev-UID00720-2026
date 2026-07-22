import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '@/core/services/auth/auth.service';
import { Subscription } from 'rxjs';
import { statisticsData } from './dashboard.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private authService: AuthService) {}

  private authSubscription!: Subscription;
  role = '';
  desc = '';
  statisticsData = statisticsData;

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      loggedInDeatils => {
        if (loggedInDeatils.role) {
          this.role = loggedInDeatils.role;
          this.desc =
            this.role === 'admin'
              ? 'System administrator overview panel. Impersonate owners or view aggregate metrics.'
              : 'Welcome back, restaurant partner! Track your orders and performance details.';
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
