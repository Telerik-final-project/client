import { Routes } from '@angular/router';
import { CreateComponent } from '../create/create.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'create', component: CreateComponent, pathMatch: 'full' },
];
