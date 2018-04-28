import { AdminAuthGuard } from './core/guards/admin-guard.service';
import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { JobApplicationComponent } from './jobs/job-application/job-application.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { JobListComponent } from './jobs/job-list.component';

import { JobListAdminComponent } from './jobs/job-admin/job-list-admin/job-list-admin.component';

import { ApplicationGuard } from './core/guards/application-guard.service';
import { AuthGuard } from './core/guards/auth-guard.service';
import { ClosedApplicationGuard } from './core/guards/closed-application-guard.service';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'auth', loadChildren: './auth/auth.module#AuthModule' }, // Lazy loading
    {
        path: 'jobs', children:
        [
            { path: '', component: JobListComponent, pathMatch: 'full' },
            { path: 'admin', canActivateChild: [AdminAuthGuard], children:
                [
                    { path: '', component: JobListAdminComponent, pathMatch: 'full' },
                    {
                        path: ':jobId', children: [
                            { path: '', component: JobDetailComponent, pathMatch: 'full' },
                            {
                                path: 'apply', component: JobApplicationComponent,
                                canDeactivate: [ApplicationGuard], canActivate: [AuthGuard, ClosedApplicationGuard],
                            },
                        ],
                    },
                ],
            },
            {
                path: ':jobId', children: [
                    { path: '', component: JobDetailComponent, pathMatch: 'full' },
                    {
                        path: 'apply', component: JobApplicationComponent,
                        canDeactivate: [ApplicationGuard], canActivate: [AuthGuard, ClosedApplicationGuard],
                    },
                ],
            },
        ],
    },
];
