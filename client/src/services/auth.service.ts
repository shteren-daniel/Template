import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

export interface LoginRequest {
  email: string | null;
  password: string | null;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: object;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, private configService: ConfigService) {}
  private tokenKey = 'token';

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken() {
    localStorage.removeItem(this.tokenKey);
  }

  login(data: LoginRequest): Observable<LoginResponse> {
    let apiUrl = this.configService.apiUrl;
    return this.http.post<LoginResponse>(`${apiUrl}/auth/login`, data);
  }

  isTokenExpired(): Observable<any> {
    let apiUrl = this.configService.apiUrl;
    return this.http.get(`${apiUrl}/auth/isTokenExpired`);
  }
}
