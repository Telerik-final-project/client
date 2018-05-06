import { Routes } from '@angular/router';

import { AdminAuthGuard } from '../../../core/guards/admin-guard.service';
import { ApplicationGuard } from '../../../core/guards/application-guard.service';
import { AuthGuard } from '../../../core/guards/auth-guard.service';
import { ClosedApplicationGuard } from '../../../core/guards/closed-application-guard.service';

import { JobListResolver } from '../../../core/resolvers/job-list.resolver';
import { ApplicationsResolver } from './../../../core/resolvers/applications.resolver';

import { JobApplicationComponent } from '../../../shared/jobs/job-application/job-application.component';
import { JobDetailComponent } from '../../../shared/jobs/job-detail/job-detail.component';
import { JobApplicationsAdminComponent } from '../job-applications-admin/job-applications-admin.component';
import { JobListAdminComponent } from '../job-list-admin/job-list-admin.component';

export const ROUTES: Routes = [
  {
    path: '',
    component: JobListAdminComponent,
    canActivate: [AdminAuthGuard],
    resolve: { jobs: JobListResolver },
    pathMatch: 'full',
  },
  {
    path: ':jobId',
    canActivateChild: [AdminAuthGuard],
    children: [
      { path: '', component: JobDetailComponent, pathMatch: 'full' },
      {
        path: 'apply',
        component: JobApplicationComponent,
        canDeactivate: [ApplicationGuard],
        canActivate: [AuthGuard, ClosedApplicationGuard],
      },
      {
        path: 'applications',
        component: JobApplicationsAdminComponent,
        resolve: { applications: ApplicationsResolver },
        canDeactivate: [ApplicationGuard],
        canActivate: [AuthGuard, ClosedApplicationGuard],
      },
    ],
  },
];
