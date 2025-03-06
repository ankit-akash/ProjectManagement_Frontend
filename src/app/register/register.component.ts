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
    roles = 'Select a role';
    registrationMessage = '';
    registrationError = false;
    passwordStrengthMessage = '';
    passwordStrengthError = false;
    emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    constructor(private router: Router, private authService: AuthService) { }

    //register function
    register() {
        if (!this.name || !this.email || !this.password || !this.confirmPassword || !this.roles) {
            this.registrationMessage = 'Please fill in all fields.';
            this.registrationError = true;
            return;
        }

        if (this.password !== this.confirmPassword) {
            this.registrationMessage = 'Passwords do not match.';
            this.registrationError = true;
            return;
        }

        if (!this.emailRegex.test(this.email)) {
            this.registrationMessage = 'Please enter a valid email address.';
            this.registrationError = true;
            return;
        }

        if (this.roles !== 'manager' && this.roles !== 'employee') {
            this.registrationMessage = 'Please select a valid role.';
            this.registrationError = true;
            return;
        }

        // Password length validation
        if (this.password.length < 5) {
            this.passwordStrengthMessage = 'Password must be at least 5 characters long.';
            this.passwordStrengthError = true;
            return;
        } else {
            this.passwordStrengthMessage = '';
            this.passwordStrengthError = false;
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