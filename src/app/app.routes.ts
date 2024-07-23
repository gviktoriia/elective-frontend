import { Routes } from '@angular/router';
import { StudentsComponent } from './features/students/students.component';
import { ElectivesComponent } from './features/electives/electives.component';
import { LoginComponent } from './core/login/login.component';
import { ElectiveDetailsComponent } from './features/elective-details/elective-details.component';
import { AppComponent } from './app.component';
import { CurriculumComponent } from './features/curriculum/curriculum.component';
import { AuthGuard } from './core/login/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: CurriculumComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'students',
        component: StudentsComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'electives',
        component: ElectivesComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'elective/:id',
        component: ElectiveDetailsComponent,
        canActivate: [AuthGuard],
    },
    { 
        path: 'login', 
        component: LoginComponent 
    },
    { 
        path: '', 
        redirectTo: '/login', 
        pathMatch: 'full' 
    },
    { 
        path: '**', 
        redirectTo: '/login' 
    } 

];
