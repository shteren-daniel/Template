import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  submitting = false;

  async onSubmit() {
    this.submitting = true;
    if (this.form.valid) {
      console.log('registration payload', this.form.value);
      await new Promise((r) => setTimeout(r, 700));
    } else {
      this.form.markAllAsTouched();
    }
    this.submitting = false;
  }

  get firstName() { return this.form.get('firstName')!; }
  get lastName() { return this.form.get('lastName')!; }
  get email() { return this.form.get('email')!; }
  get password() { return this.form.get('password')!; }
}
