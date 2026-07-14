import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
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
  submitForm() {
    if (this.userForm.valid) {
      const { email, password } = this.userForm.value;

      this.authService.login(email, password).subscribe({
        next: userApiResponse => {
          if (userApiResponse.status && userApiResponse.email && userApiResponse.role) {
            localStorage.setItem('email', userApiResponse.email);
            localStorage.setItem('role', userApiResponse.role);
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
