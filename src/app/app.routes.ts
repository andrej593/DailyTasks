import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { UserHomeComponent } from './protected/user-home/user-home.component';
import { CalanderComponent } from './calander/calander.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent },
    { path: 'calander', component: CalanderComponent },
    {
        path: 'protected/userHome',
        component: UserHomeComponent,
        canActivate: [AuthGuard],
    },
    { path: '**', component: HomeComponent }
];
