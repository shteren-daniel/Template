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
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    remember: new FormControl(false),
  });

  submitting = false;

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
      next: (res) => {
        console.log('Login success:', res);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/main']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        alert('שגיאה בהתחברות');
        this.submitting = false;
      }
    });
  }
}
