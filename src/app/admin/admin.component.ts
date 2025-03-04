import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ManagerService, Manager } from '../services/managerservice.service';
import { EmployeeService, Employee } from '../services/employee.service';
import { ProjectService, Project } from '../services/project.service';
import { HttpClientModule } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [ManagerService, EmployeeService, ProjectService],
})
export class AdminComponent implements OnInit {
  managers: Manager[] = [];
  employees: Employee[] = [];
  projects: Project[] = [];
  showModal = false;
  isEdit = false;
  modalType: 'manager' | 'employee' | 'project' = 'manager';
  modalTitle = '';
  adminForm: FormGroup;

  showManagersTable = false;
  showEmployeesTable = false;
  showProjectsTable = false;
  employeesByProject: { [projectId: number]: Employee[] } = {};


  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService,
    private employeeService: EmployeeService,
    private projectService: ProjectService,
    private router:Router
  ) {
    this.adminForm = this.fb.group({
      id: [null, Validators.required],
      name: ['', Validators.required],
      email: [''],
      projectId: [null],
      projectDesc: [''],
      employeeId: [null],
      employeeName: [''],
      employeeEmail: [''],
      projectName: [''],
      managerId: [null],
      managerName: [''],
      managerEmail: ['']

    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.managerService.getManagers().subscribe((data) => (this.managers = data));
    this.employeeService.getEmployees().subscribe((data) => (this.employees = data));
    this.projectService.getProjects().subscribe((data) => {
        this.projects = data.map(project => ({...project, showEmployees: false}));
    });
}

  openModal(type: 'manager' | 'employee' | 'project', data: any = null) {
    this.showModal = true;
    this.modalType = type;
    this.modalTitle = `${data ? 'Edit' : 'Add'} ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    if (data) {
      this.isEdit = true;
      if (type === 'manager') this.adminForm.patchValue({id: data.managerId, name: data.managerName, email: data.managerEmail, projectId: data.projectId});
      if (type === 'employee') this.adminForm.patchValue({id: data.employeeId, name: data.employeeName, email: data.employeeEmail, projectId: data.projectId});
      if (type === 'project') this.adminForm.patchValue({id: data.projectId, name: data.projectName, projectDesc: data.projectDesc});
    } else {
      this.isEdit = false;
      this.adminForm.get('id')?.enable(); //Enable the id control
      this.adminForm.reset();
    }
  }

  closeModal() {
    this.showModal = false;
    this.adminForm.get('id')?.enable();

  }

  toggleEmployees(projectId: number) {
    const project = this.projects.find((p) => p.projectId === projectId);
    if (project) {
        project.showEmployees = !project.showEmployees;
        if (project.showEmployees && !this.employeesByProject[projectId]) {
            this.employeesByProject[projectId] = this.employees.filter(emp => emp.projectId === projectId);
        }
    }
}

  saveData() {
    if (this.adminForm.valid) {
        const data = this.adminForm.value;
        if (this.isEdit) {
            // Update operation
            if (this.modalType === 'manager') {
                this.managerService.updateManager({ managerId: data.id, managerName: data.name, managerEmail: data.email, projectId: data.projectId }).subscribe({
                    next: (response) => {
                        this.loadData();
                        console.log('Manager updated successfully:', response);
                        alert('Manager updated successfully.');
                    },
                    error: (error) => {
                        console.error('Error updating manager:', error);
                        alert('Error updating manager. Please check the console.');
                    },
                    complete: () => this.closeModal()
                });
            } else if (this.modalType === 'employee') {
                this.employeeService.updateEmployee({ employeeId: data.id, employeeName: data.name, employeeEmail: data.email, projectId: data.projectId }).subscribe({
                    next: (response) => {
                        this.loadData();
                        console.log('Employee updated successfully:', response);
                        alert('Employee updated successfully.');
                    },
                    error: (error) => {
                        console.error('Error updating employee:', error);
                        alert('Error updating employee. Please check the console.');
                    },
                    complete: () => this.closeModal()
                });
            } else if (this.modalType === 'project') {
                this.projectService.updateProject({ projectId: data.id, projectName: data.name, projectDesc: data.projectDesc }).subscribe({
                    next: (response) => {
                        this.loadData();
                        console.log('Project updated successfully:', response);
                        alert('Project updated successfully.');
                    },
                    error: (error) => {
                        console.error('Error updating project:', error);
                        alert('Error updating project. Please check the console.');
                    },
                    complete: () => this.closeModal()
                });
            }
        } else {
          if (this.modalType === 'manager') {
                this.managerService.addManager({ managerId: data.id, managerName: data.name, managerEmail: data.email, projectId: data.projectId }).subscribe({
                    next: (response) => {
                        this.loadData();
                        console.log('Manager added successfully:', response);
                        alert('Manager added successfully.');
                    },
                    error: (error) => {
                        console.error('Error adding manager:', error);
                        alert('Error adding manager. Please check the console.');
                    },
                    complete: () => this.closeModal()
                });
            } else if (this.modalType === 'employee') {
                this.employeeService.addEmployee({ employeeId: data.id, employeeName: data.name, employeeEmail: data.email, projectId: data.projectId }).subscribe({
                    next: (response) => {
                        this.loadData();
                        console.log('Employee added successfully:', response);
                        alert('Employee added successfully.');
                    },
                    error: (error) => {
                        console.error('Error adding employee:', error);
                        alert('Error adding employee. Please check the console.');
                    },
                    complete: () => this.closeModal()
                });
            } else if (this.modalType === 'project') {
                this.projectService.addProject({ projectId: data.id, projectName: data.name, projectDesc: data.projectDesc }).subscribe({
                    next: (response) => {
                        this.loadData();
                        console.log('Project added successfully:', response);
                        alert('Project added successfully.');
                    },
                    error: (error) => {
                        console.error('Error adding project:', error);
                        alert('Error adding project. Please check the console.');
                    },
                    complete: () => this.closeModal()
                });
            }
        }
    }
}

  deleteManager(manager: Manager) {
    if (confirm(`Are you sure you want to delete Manager with ID ${manager.managerId}?`)) {
      this.managerService.deleteManager(manager.managerId).subscribe(() => {
        this.loadData();
        console.log('Manager deleted:', manager);
        alert(`Manager with ID ${manager.managerId} deleted successfully.`);
      });
    }

  }

  deleteEmployee(employee: Employee) {
    if (confirm(`Are you sure you want to delete Employee with ID ${employee.employeeId}?`)) {
      this.employeeService.deleteEmployee(employee.employeeId).subscribe(() => {
        this.loadData();
        console.log('Employee deleted:', employee);
        alert(`Employee with ID ${employee.employeeId} deleted successfully.`);
      });
    }
  }

  deleteProject(project: Project) {
    if (confirm(`Are you sure you want to delete Project with ID ${project.projectId}?`)) {
      this.projectService.deleteProject(project.projectId).subscribe(() => {
        this.loadData();
        console.log('Project deleted:', project);
        alert(`Project with ID ${project.projectId} deleted successfully.`);
      });
    }
  }
  
  showManagers() {
    this.showManagersTable = true;
    this.showEmployeesTable = false;
    this.showProjectsTable = false;
  }

  showEmployees() {
    this.showManagersTable = false;
    this.showEmployeesTable = true;
    this.showProjectsTable = false;
  }

  showProjects() {
    this.showManagersTable = false;
    this.showEmployeesTable = false;
    this.showProjectsTable = true;
  }
}