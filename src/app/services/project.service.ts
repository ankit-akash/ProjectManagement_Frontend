import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Project {
  projectId: number;
  projectName: string;
  projectDesc: string;
  showEmployees?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectApiUrl = 'http://localhost:3434/project';

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.projectApiUrl}/getAll`);
  }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.projectApiUrl}/add`, project);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.projectApiUrl}/update/${project.projectId}`, project);
  }

  deleteProject(projectId: number): Observable<any> {
    return this.http.delete(`${this.projectApiUrl}/deleteById/${projectId}`);
  }
}