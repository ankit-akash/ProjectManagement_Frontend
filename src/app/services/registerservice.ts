import { Injectable } from '@angular/core';
import { User } from '../register/register.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:9194/auth';
 
  constructor(private http: HttpClient) {}
 
  register(user:User): Observable<string>{
    const api=this.baseUrl+`/new`;
    return this.http.post(api,user,{ responseType: 'text' });

  }
}
