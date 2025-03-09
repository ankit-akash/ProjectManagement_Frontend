import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { map, Observable } from 'rxjs';

interface AuthTokenResponse {
  token: string;
  role: string;
}

@Injectable({       // This is a decorator that gets injected as a dependency.
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3434/auth/authenticate';

  constructor(private http: HttpClient) {}

  login(loginData: any): Observable<AuthTokenResponse> {
    return this.http.post<AuthTokenResponse>(this.apiUrl, loginData, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    });
  }
  
  setToken(token: string): void {
    localStorage.setItem('token', token);
  }
  getToken(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Retrieve the token

    if (!token) {
      // Handle the case where the token is not available (e.g., redirect to login)
      console.error('Token not found.');
      return new Observable<any[]>(); // or throw an error
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
