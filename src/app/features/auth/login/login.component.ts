import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passwordHidden = true;
  userForm!: FormGroup;

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
      this.router.navigate(['/dashboard']);
    }
  }

  submitForm() {
    if (!this.userForm.valid) {
      return;
    }

    const { email, password } = this.userForm.value;
    this.authService.login(email, password).subscribe({
      next: userApiResponse => {
        if (userApiResponse.status) {
          this.router.navigate(['/dashboard']);
        } else {
          alert('invalid credentials');
        }
      },
      error: err => {
        alert(err.errorMessage);
      },
    });
  }
}
