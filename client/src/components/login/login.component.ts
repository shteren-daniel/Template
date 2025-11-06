import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router, private authService: AuthService) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submitting = false;
  serverError = '';

  get email() {
    return this.form.get('email')!;
  }

  get password() {
    return this.form.get('password')!;
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.submitting = true;

    this.authService.login(this.form.getRawValue()).subscribe({
      next: (response) => {
        console.log('Login success:', response);
        if (response?.success && response.data) {
          const token = (response.data as any).token;
          localStorage.setItem('token', token);
          this.router.navigate(['/main']);
        } else {
          this.serverError = 'התחברות נכשלה. נסה שוב מאוחר יותר.';
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.serverError =
          err.error?.message || 'התחברות נכשלה. נסה שוב מאוחר יותר.';
        this.submitting = false;
      },
    });
  }
}
