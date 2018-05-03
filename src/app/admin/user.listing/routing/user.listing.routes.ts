import { Routes } from '@angular/router';
import { AdminAuthGuard } from '../../../core/guards/admin-guard.service';
import { ListingComponent } from '../listing/listing.component';

export const ROUTES: Routes = [
    { path: '', component: ListingComponent, canActivate: [AdminAuthGuard], pathMatch: 'full' },
];
