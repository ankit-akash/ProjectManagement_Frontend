import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Employee {
  employeeId: number;
  employeeName: string;
  employeeEmail: string;
  projectId: number;
}

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private employeeApiUrl = 'http://localhost:8050/employee';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.employeeApiUrl}/getAll`);
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.employeeApiUrl}/add`, employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.employeeApiUrl}/update/${employee.employeeId}`, employee);
  }

  deleteEmployee(employeeId: number): Observable<any> {
    return this.http.delete(`${this.employeeApiUrl}/deleteById/${employeeId}`);
  }
}