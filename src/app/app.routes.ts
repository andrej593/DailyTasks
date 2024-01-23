import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { CalanderComponent } from './calander/calander.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent }, //TODO if logged in redirect to userHome
    { path: 'login', component: LoginComponent },       //TODO if logged in redirect to userHome
    { path: '', component: HomeComponent },             //TODO if logged in redirect to userHome
    {
        path: 'protected/calander',
        component: CalanderComponent,
        canActivate: [AuthGuard],
    },
    { path: '**', component: HomeComponent }
];
