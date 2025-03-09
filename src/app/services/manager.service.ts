import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ManagerService {
  private managerApiUrl = 'http://localhost:3434/manager/getAll';
  private addManagerApiUrl = 'http://localhost:3434/manager/add';
  private updateManagerApiUrl = 'http://localhost:3434/manager/update/';
  private deleteManagerApiUrl = 'http://localhost:3434/manager/deleteById/'; 
  private employeeApiUrl = 'http://localhost:3434/employee/getAll';
  private addEmployeeApiUrl = 'http://localhost:3434/employee/add';
  private updateEmployeeApiUrl = 'http://localhost:3434/employee/update/';
  private deleteEmployeeApiUrl = 'http://localhost:3434/employee/deleteById/'; 
  private projectApiUrl = 'http://localhost:3434/project/getAll';
  private addProjectApiUrl = 'http://localhost:3434/project/add';

  // Inject the HttpClient service into the constructor
  constructor(private http: HttpClient) {}

  getManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.managerApiUrl);
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeApiUrl);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.projectApiUrl);
  }

  addManager(manager: Manager): Observable<Manager> {
    return this.http.post<Manager>(this.addManagerApiUrl, manager);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.addEmployeeApiUrl, employee);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(this.addProjectApiUrl, project);
  }

  deleteManager(managerId: number): Observable<any> {
    return this.http.delete(`${this.deleteManagerApiUrl}${managerId}`);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.deleteEmployeeApiUrl}${employeeId}`);
  }

  updateManager(manager: Manager): Observable<Manager> {
    return this.http.put<Manager>(`${this.updateManagerApiUrl}${manager.managerId}`, manager);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.updateEmployeeApiUrl}${employee.employeeId}`, employee);
  }
}

export interface Manager {
  managerId: number;
  managerName: string;
  managerEmail: string;
  projectId: number;
  isEditing?: boolean;
}

export interface Employee {
  employeeId: number;
  employeeName: string;
  employeeEmail: string;
  projectId: number;
  isEditing?: boolean;

}

export interface Project {
  projectId: number;
  projectName: string;
  projectDesc: string;
}