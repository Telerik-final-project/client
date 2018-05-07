import { Routes } from '@angular/router';

import { AdminAuthGuard } from '../../../core/guards/admin-guard.service';
import { CreateComponent } from '../create/create.component';
import { EditComponent } from '../edit/edit.component';
import { ListingComponent } from '../listing/listing.component';

export const ROUTES: Routes = [
    { path: '', component: ListingComponent, canActivate: [AdminAuthGuard], pathMatch: 'full' },
    { path: 'create', component: CreateComponent, canActivate: [AdminAuthGuard], pathMatch: 'full' },
    { path: 'edit/:id', component: EditComponent, canActivate: [AdminAuthGuard], pathMatch: 'full' },
];
