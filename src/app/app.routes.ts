import { Routes } from '@angular/router';
import { StudentsComponent } from './pages/students/students.component';
import { ElectivesComponent } from './pages/electives/electives.component';
import { LoginComponent } from './pages/login/login.component';
import { ElectiveDetailsComponent } from './pages/elective-details/elective-details.component';
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
