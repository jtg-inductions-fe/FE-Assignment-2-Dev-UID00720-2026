import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  userForm!: FormGroup;
  private router = inject(Router);

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn$) {
      this.router.navigate(['/dashboard']);
    }
  }

  submitForm() {
    if (this.userForm.valid) {
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
    } else {
      alert('Invalid Form');
    }
  }
}
