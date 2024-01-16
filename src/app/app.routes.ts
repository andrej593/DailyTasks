import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'register', component:  RegisterComponent},
    { path: 'login', component:  HomeComponent},
    { path: '', component:  HomeComponent}
];
