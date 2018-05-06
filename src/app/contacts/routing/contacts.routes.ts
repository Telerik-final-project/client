import { Routes } from '@angular/router';

import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full' },
    { path: 'create', component: CreateComponent, pathMatch: 'full' },
    { path: 'edit/:id', component: EditComponent, pathMatch: 'full' },
];
