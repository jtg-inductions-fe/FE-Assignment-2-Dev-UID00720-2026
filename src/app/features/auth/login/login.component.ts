import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth/auth.service';
import { ROUTES } from '@core/routes.constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passwordHidden = true;
  userForm!: FormGroup;
  dashboardUrl = ROUTES.DASHBOARD;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn$) {
      this.router.navigate([this.dashboardUrl]);
    }
  }

  submitForm() {
    if (!this.userForm.valid) {
      return;
    }

    this.loading = true;

    const { email, password } = this.userForm.value;
    this.authService.login(email, password).subscribe({
      next: userApiResponse => {
        if (userApiResponse.status) {
          this.loading = false;
          this.router.navigate([this.dashboardUrl]);
        } else {
          this.loading = false;
          alert('invalid credentials');
        }
      },
      error: err => {
        alert(err.errorMessage);
      },
    });
  }
}
