import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AdminComponent } from "./admin/admin.component";
import { EmployeesComponent } from "./employees/employees.component";
import { LoginComponent } from "./login/login.component";
import { ManagerComponent } from "./manager/manager.component";

@Component({
  selector: 'root',
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router: Router) {}

  title = 'ProjectManagement';
  showLogoutButton(): boolean {
    const currentRoute = this.router.url;
    const protectedRoutes = ['/admin', '/manager', '/employee', '/project'];
    return protectedRoutes.includes(currentRoute);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('uName');
    this.router.navigate(['/login']);
  }
}
