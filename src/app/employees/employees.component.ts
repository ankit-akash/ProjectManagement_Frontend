// employees.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


interface Employee {
  employeeId: number;
  employeeName: string;
  employeeEmail: string;
  projectId: number;
}

interface Manager {
  managerId: number;
  managerName: string;
  managerEmail: string;
  projectId: number;

}

interface Project {
  projectId: number;
  projectName: string;
  projectDesc: string;
}

@Component({
  selector: 'employees',
  standalone: true,
  imports: [CommonModule, UpperCasePipe],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  managers: Manager[] = [];
  projects: Project[] = [];

  showEmployees = false;
  showManagers = false;
  showProjects = false;

  constructor(private http: HttpClient,private router:Router) {}

  ngOnInit() {}

  //fetch the employee data
  fetchEmployees() {
    this.http.get<Employee[]>('http://localhost:8050/employee/getAll').subscribe(
      (data: Employee[]) => {
        this.employees = data;
        this.showEmployees = true;
        this.showManagers = false;
        this.showProjects = false;
        console.log('Employees Data Fetched:', this.employees);

      },
      (error) => {
        console.error('Error fetching employees:', error);
      }
    );
  }

  //fetch the Manager data
  fetchManagers() {
    this.http.get<Manager[]>('http://localhost:8060/manager/getAll').subscribe(
      (data:Manager[]) => {
        this.managers = data;
        this.showEmployees = false;
        this.showManagers = true;
        this.showProjects = false;
        console.log('Managers Data Fetched:', this.managers);
      },
      (error) => {
        console.error('Error fetching managers:', error);
      }
    );
  }

  
  //fetch the Project data
  fetchProjects() {
    this.http.get<Project[]>('http://localhost:8055/project/getAll').subscribe(
      (data:Project[]) => {
        this.projects = data;
        this.showEmployees = false;
        this.showManagers = false;
        this.showProjects = true;
        console.log('Projects Data Fetched:', this.projects);
      },
      (error) => {
        console.error('Error fetching projects:', error);
      }
    );
  }
}