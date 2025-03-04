import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from 'express';
import { Observable } from 'rxjs';

interface AuthTokenResponse {
  token: string;
  role: string;
}

@Injectable({
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
