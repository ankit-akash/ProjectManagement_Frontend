import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { ManagerComponent } from './manager/manager.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path: "",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "admin",
        component: AdminComponent,
        canActivate: [AuthGuard] // AuthGuard
    },
    {
        path: "manager",
        component: ManagerComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "employee",
        component: EmployeesComponent,
        canActivate: [AuthGuard]
    },
    {
        path: "project",
        component: ProjectComponent,
        canActivate: [AuthGuard]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }