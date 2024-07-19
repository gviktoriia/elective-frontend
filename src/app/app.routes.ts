import { Routes } from '@angular/router';
import { StudentsComponent } from './features/students/students.component';
import { ElectivesComponent } from './features/electives/electives.component';
import { LoginComponent } from './core/login/login.component';
import { ElectiveDetailsComponent } from './features/elective-details/elective-details.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: 'students',
        component: StudentsComponent
    },
    {
        path: 'electives',
        component: ElectivesComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'elective',
        component: ElectiveDetailsComponent
    }
];
