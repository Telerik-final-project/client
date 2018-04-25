import { Routes } from '@angular/router';
import { RegisterComponent } from '../register.component';
import { LoginComponent } from './../login.component';

export const ROUTES: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
];
