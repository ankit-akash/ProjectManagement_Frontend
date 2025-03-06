import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'nav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavComponent implements OnInit {

  title: string = 'ProjectManagement';

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateTitle();
      });
  }

  ngOnInit(): void {
    this.updateTitle();
  }

  updateTitle() {
    const currentRoute = this.router.url;
    if (currentRoute === '/admin') {
      this.title = 'Admin Dashboard';
    } else if (currentRoute === '/manager') {
      this.title = 'Manager Dashboard';
    } else if (currentRoute === '/employee') {
      this.title = 'Employee Dashboard';
    } else if (currentRoute === '/project') {
      this.title = 'Project Dashboard';
    } else {
      this.title = 'ProjectManagement';
    }
  }

  showLogoutButton(): boolean {
    const currentRoute = this.router.url;
    const protectedRoutes = ['/admin', '/manager', '/employee', '/project'];
    return protectedRoutes.includes(currentRoute);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}