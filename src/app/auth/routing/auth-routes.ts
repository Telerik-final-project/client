import { Routes } from '@angular/router';
import { LoginComponent } from '../login.component';
import { RegisterComponent } from '../register.component';

export const ROUTES: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'login', component: LoginComponent },
];
