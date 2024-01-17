import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent },
    {
        path: 'protected/userHome',
        component: HomeComponent,
        canActivate: [AuthGuard],
    }
];
