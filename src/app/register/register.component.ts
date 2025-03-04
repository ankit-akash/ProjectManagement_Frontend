import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/registerservice';
import { NgClass } from '@angular/common';

export interface User {
    name: string;
    email: string;
    password: string;
    roles: string;
}

@Component({
    selector: 'app-register',
    imports: [FormsModule, RouterModule, NgClass],
    templateUrl: './register.component.html',
    styleUrl: './register.component.css',
    standalone: true
})
export class RegisterComponent {
    name = '';
    email = '';
    password = '';
    confirmPassword = '';
    roles = 'admin'; 
    registrationMessage = '';
    registrationError = false;

    constructor(private router: Router, private authService: AuthService) { }

    register() {

        if(!this.name || !this.email || !this.password || !this.confirmPassword || !this.roles){
            this.registrationMessage = 'Please fill in all fields.';
            this.registrationError = true;
            return;
        }

        if (this.password !== this.confirmPassword) {
            this.registrationMessage = 'Passwords do not match.';
            this.registrationError = true;
            return;
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(this.email)) {
            this.registrationMessage = 'Please enter a valid email address.';
            this.registrationError = true;
            return;
        }

        if (this.roles !== 'admin' && this.roles !== 'manager' && this.roles !== 'employee') {
            this.registrationMessage = 'Please select a valid role.';
            this.registrationError = true;
            return;
        }

        const user: User = {
            name: this.name,
            email: this.email,
            password: this.password,
            roles: this.roles,
        };

        this.authService.register(user).subscribe(
            (response: string) => {
                alert('Registration successful!');
                this.router.navigate(['/login']);
            },
            (error: any) => {
                console.error('Registration failed:', error);
                this.registrationMessage = 'Registration failed. Please try again.';
                this.registrationError = true;
            }
        );
    }
}