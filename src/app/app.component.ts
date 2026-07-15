import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  public userLoggedIn = false;

  ngOnInit() {
    this.authService.isLoggedIn$.subscribe(loginStatus => {
      this.userLoggedIn = loginStatus.status;
    });
  }
  title = 'assignment2';
}
