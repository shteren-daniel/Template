import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

export interface LoginRequest {
  email: string | null;
  password: string | null;
}

export interface LoginResponse {
  token: string;
  userId: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient, 
    private configService: ConfigService) {}

  login(data: LoginRequest): Observable<LoginResponse> {
    let apiUrl = this.configService.apiUrl;
    return this.http.post<LoginResponse>(`${apiUrl}/login`, data);
  }
}
