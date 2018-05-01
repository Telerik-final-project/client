import { Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from './../register/register.component';

export const ROUTES: Routes = [
    { path: 'register', component: RegisterComponent},
    { path: 'login', component: LoginComponent},
];
