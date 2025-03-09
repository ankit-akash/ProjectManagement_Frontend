import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';


import {
  ManagerService,
  Manager,
  Employee,
  Project,
} from '../services/manager.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'manager',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, HttpClientModule],
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
  providers: [ManagerService],
})
export class ManagerComponent implements OnInit {
  managers: Manager[] = [];
  employees: Employee[] = [];
  projects: Project[] = [];

  showManagers: boolean = false;
  showEmployees: boolean = false;
  showProjects: boolean = false;
  showAddManagerForm: boolean = false;
  showAddEmployeeForm: boolean = false;
  showAddProjectForm: boolean = false;
  isLoadingEmployees: boolean = false;
  isLoadingProjects: boolean = false;
  newManager: Manager = {
    managerId: 0,
    managerName: '',
    managerEmail: '',
    projectId: 0,
  };
  newEmployee: Employee = {
    employeeId: 0,
    employeeName: '',
    employeeEmail: '',
    projectId: 0,
  };
  newProject: Project = { projectId: 0, projectName: '', projectDesc: '' };
  isLoading = false;
  isLoadingManagers: boolean = false;

  constructor(
    private managerService: ManagerService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private router:Router

  ) {}

  editEmployee(employee: Employee) {
    employee.isEditing = true;
    this.cdr.detectChanges(); // Trigger change detection while editing
  }
  ngOnInit(): void {}   // Load data when the component initializes

  onViewManagers() {
    console.log('Viewing Manager Details');
    this.showManagers = true;
    this.isLoadingManagers = true;
    this.showEmployees = false;
    this.showProjects = false;
    this.showAddManagerForm = false;
    this.showAddEmployeeForm = false;
    this.showAddProjectForm = false;

    this.managerService.getManagers().subscribe(
      (data: Manager[]) => {
        this.managers = data;
        this.employees = [];
        this.projects = [];
        this.isLoadingManagers = false; // Reset loading state
        console.log('Managers array:', this.managers);
      },
      (error: HttpErrorResponse) => {
        console.error('Error Fetching Managers:', error);
        this.isLoadingManagers = false; // Reset loading state on error
      }
    );
  }

  onAddManager() {
    this.showManagers = false;
    this.showEmployees = false;
    this.showProjects = false;
    this.showAddManagerForm = true;
    this.showAddEmployeeForm = false;
    this.showAddProjectForm = false;
  }

  onAddManagerSubmit() {
    // Check for empty fields
    if (!this.newManager.managerId || !this.newManager.managerName || !this.newManager.managerEmail || !this.newManager.projectId) {
      alert('Please fill in all fields.');
      return; /// Exit the function
    }
    const idExists = this.managers.some(manager => manager.managerId === this.newManager.managerId);
    //some() method checks for common element in the array

    if (idExists) {
      alert(`Manager ID ${this.newManager.managerId} already exists.`);
      return;
    }

    this.managerService.addManager(this.newManager).subscribe(
      //subscribe() does lazy execution of an Observable
      (response) => {
        console.log('Manager added successfully:', response);
        alert('Manager Added Successfully');
        this.newManager = {
          managerId: 0,
          managerName: '',
          managerEmail: '',
          projectId: 0,
        };
        this.showAddManagerForm = false;
        this.onViewManagers();
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding manager:', error);
      }
    );
  }


  onViewEmployees() {
    console.log('Viewing Employee Details');
    this.showManagers = false;
    this.showEmployees = true;
    this.showProjects = false;
    this.showAddManagerForm = false;
    this.showAddEmployeeForm = false;
    this.showAddProjectForm = false;
    this.isLoadingEmployees = true;
    this.managerService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
        console.log('Employees array:', this.employees);
        this.managers = [];
        this.projects = [];
        this.isLoadingEmployees = false;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching employees:', error);
        this.isLoadingEmployees = false;
      }
    );
  }

  onAddEmployee() {
    this.showManagers = false;
    this.showEmployees = false;
    this.showProjects = false;
    this.showAddManagerForm = false;
    this.showAddEmployeeForm = true;
    this.showAddProjectForm = false;
  }

  onAddEmployeeSubmit() {
    if (!this.newEmployee.employeeId || !this.newEmployee.employeeName || !this.newEmployee.employeeEmail || !this.newEmployee.projectId) {
      alert('Please fill in all fields.');
      return;
    }

    const idExists = this.employees.some(employee => employee.employeeId === this.newEmployee.employeeId);
    if (idExists) {
      alert(`Employee ID ${this.newEmployee.employeeId} already exists.`);
      return;
    }

    this.managerService.addEmployee(this.newEmployee).subscribe(
    //subscribe() does lazy execution of an Observable
      (response) => {
        console.log('Employee added successfully:', response);
        alert('Employee Added Successfully');
        this.newEmployee = {
          employeeId: 0,
          employeeName: '',
          employeeEmail: '',
          projectId: 0,
        };
        this.showAddEmployeeForm = false;
        this.onViewEmployees();
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding employee:', error);
      }
    );
  }

  deleteEmployee(employeeId: number) {
    if (confirm('Are you sure you want to delete this Employee?')) {
      this.managerService.deleteEmployee(employeeId).subscribe(
      //subscribe() does lazy execution of an Observable
        (response) => {
          console.log('Employee deleted successfully:', response);
          alert('Employee Deleted Successfully');
          this.onViewEmployees(); // Refresh the list
          this.isLoading = false;
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting employee:', error);
        }
      );
    }
  }

  onViewProjects() {
    console.log('Viewing Project Details');
    this.showManagers = false;
    this.showEmployees = false;
    this.showProjects = true;
    this.showAddManagerForm = false;
    this.showAddEmployeeForm = false;
    this.showAddProjectForm = false;
    this.isLoadingProjects = true;
    this.managerService.getProjects().subscribe(
    //subscribe() does lazy execution of an Observable
      (data: Project[]) => {
        this.projects = data;
        this.managers = [];
        this.employees = [];
        this.isLoadingProjects = false;
        console.log('Project array:', this.projects);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching projects:', error);
        this.isLoadingProjects = false;
      }
    );
  }

  onAddProject() {
    console.log('onAddProject() clicked');
    this.showAddProjectForm = true;
    console.log('showAddProjectForm: ', this.showAddProjectForm);
    this.showManagers = false;
    this.showEmployees = false;
    this.showProjects = false;
    this.showAddManagerForm = false;
    this.showAddEmployeeForm = false;
    debugger;
  }

  onAddProjectSubmit() {
    if (!this.newProject.projectId || !this.newProject.projectName || !this.newProject.projectDesc) {
      alert('Please fill in all fields.');
      return;
    }

    const idExists = this.projects.some(project => project.projectId === this.newProject.projectId);
    if (idExists) {
      alert(`Project ID ${this.newProject.projectId} already exists.`);
      return;
    }

    this.managerService.addProject(this.newProject).subscribe(
    //subscribe() does lazy execution of an Observable
      (response) => {
        console.log('Project added successfully:', response);
        alert('Project Added Successfully');
        this.newProject = { projectId: 0, projectName: '', projectDesc: '' };
        this.showAddProjectForm = false;
        this.onViewProjects();
      },
      (error: HttpErrorResponse) => {
        console.error('Error adding project:', error);
      }
    );
  }


  deleteManager(managerId: number) {
    if (confirm('Are you sure you want to delete this manager?')) {
      this.managerService.deleteManager(managerId).subscribe(
      //subscribe() does lazy execution of an Observable
        (response) => {
          console.log('Manager deleted successfully:', response);
          alert('Manager Deleted Successfully');
          this.onViewManagers();
          this.isLoading = false;
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting manager:', error);
        }
      );
    }
  }

  editManager(manager: Manager) {
    manager.isEditing = true;
  }

  updateManager(manager: Manager) {
    const idExists = this.managers.some(m => m.managerId === manager.managerId && m !== manager);
    if (idExists) {
      alert(`Manager ID ${manager.managerId} already exists.`);
      return;
    }
    this.managerService.updateManager(manager).subscribe(
    //subscribe() does lazy execution of an Observable
      (response) => {
        console.log('Manager updated successfully:', response);
        alert('Manager Updated Successfully');
        manager.isEditing = false;
        this.onViewManagers();
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating manager:', error);
      }
    );
  }

  updateEmployee(employee: Employee) {
    const idExists = this.employees.some(e => e.employeeId === employee.employeeId && e !== employee);
    if (idExists) {
      alert(`Employee ID ${employee.employeeId} already exists.`);
      return;
    }
    this.managerService.updateEmployee(employee).subscribe(
    //subscribe() does lazy execution of an Observable
      (response) => {
        console.log('Employee updated successfully:', response);
        alert('Employee Updated Successfully');
        employee.isEditing = false;
        this.cdr.detectChanges();
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating employee:', error);
      }
    );
  }
}