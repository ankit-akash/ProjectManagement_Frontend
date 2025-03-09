import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../services/loginservice';
import * as CryptoJS from 'crypto-js';
import { Constant } from '../login/constant';
import { NgClass } from '@angular/common';

interface AuthTokenResponse {
  token: string;
  role: string;
}

@Component({
  selector: 'login',
  imports: [RouterModule, FormsModule, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  loginData = {
    username: '',
    password: '',
  };

  loginError = false; // Adds loginError flag
  loginMessage = ''; // Adds loginMessage

  constructor(private loginService: LoginService, private router: Router) {} 
  //Constructor injects LoginService and Router in component

  encriptData(data: any) {
    return CryptoJS.AES.encrypt(data, Constant.EN_KEY).toString();
  }

  login() {
    if (!this.loginData.username || !this.loginData.password) {
      this.loginMessage = 'Please enter both username and password.';
      this.loginError = true;
      return;
    }

    this.loginService.login(this.loginData).subscribe( //Call the login service and subscribe to the Observable.
      (token: AuthTokenResponse) => {
        const enrUserName = this.encriptData(this.loginData.username);
        localStorage.setItem('uName', enrUserName);
        localStorage.setItem('token', token.token);
        console.log('username:', this.loginData.username);

        if (token.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (token.role === 'manager') {
          this.router.navigate(['/manager']);
        } else if (token.role === 'employee') {
          this.router.navigate(['/employee']);
        } else {
          console.warn('Unknown role:', token.role);
          this.router.navigate(['/']);
        }

        alert(`Login Successful as ${token.role}.`);
        console.log(`Logged in as: ${token.role}.`);
        this.loginMessage = '';
        this.loginError = false;
      },
      (error) => {
        console.error('Login failed:', error);
        this.loginMessage = 'Login failed. Please check your credentials.';
        this.loginError = true;
      }
    );
  }
}
