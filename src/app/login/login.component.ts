import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/loginservice';
import * as CryptoJS from 'crypto-js';
import { Constant } from '../login/constant';

interface AuthTokenResponse {
  token: string;
  role: string;
}

@Component({
  selector: 'login',
  imports: [RouterModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };

  constructor(private loginService: LoginService, private router: Router) {}

  encriptData(data: any) {
    return CryptoJS.AES.encrypt(data, Constant.EN_KEY).toString();
  }

  login() {
    this.loginService.login(this.loginData).subscribe(
      (token: AuthTokenResponse) => {
        const enrUserName = this.encriptData(this.loginData.username);
        localStorage.setItem('uName', enrUserName);
        localStorage.setItem('token', token.token);

        if (token.role === 'admin') {
          this.router.navigate(['/admin']);
        } 
        else if (token.role === 'manager') {
          this.router.navigate(['/manager']);
        }
        else if(token.role === 'employee'){
          this.router.navigate(['/employee'])
        }
        else {
          console.warn('Unknown role:', token.role);
          this.router.navigate(['/']);
        }

        alert(
          `Login Successful as ${token.role}.`
        );
        console.log(
          `Logged in as: ${token.role}.`
        );
      },
      (error) => {
        console.error('Login failed:', error);
        alert('Login failed. Please check your credentials.');
      }
    );
  }
}
