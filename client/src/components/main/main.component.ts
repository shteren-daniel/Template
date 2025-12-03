import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor(private authService: AuthService) {}
  isTokenExpired: string = "";

  sendRequest() {
   this.authService.isTokenExpired().subscribe({
      next: (response) => {
        console.log('Login success:', response);
        if (response?.success && response.data) {
         this.isTokenExpired=response.data;
        } else {
          this.isTokenExpired = 'התחברות נכשלה. נסה שוב מאוחר יותר.';
        }
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.isTokenExpired = err.error.message;
      },
    });
  }
}
