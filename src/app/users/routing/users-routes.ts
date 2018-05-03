import { Routes } from '@angular/router';
import { AuthDisabledGuard } from '../../core/guards/auth-disabled-guard.sercice';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from './../register/register.component';

export const ROUTES: Routes = [
    {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthDisabledGuard],
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthDisabledGuard],
        pathMatch: 'full',
    },
];
