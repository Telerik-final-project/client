import { Routes } from '@angular/router';

import { ApplicationGuard } from '../../core/guards/application-guard.service';
import { AuthGuard } from '../../core/guards/auth-guard.service';
import { ClosedApplicationGuard } from '../../core/guards/closed-application-guard.service';
import { UserAlreadyAppliedGuard } from '../../core/guards/user-already-applied-guard.service';

import { JobApplicationComponent } from '../../shared/jobs/job-application/job-application.component';
import { JobDetailComponent } from '../../shared/jobs/job-detail/job-detail.component';
import { JobListComponent } from '../job-list.component';

export const ROUTES: Routes = [
  { path: '', component: JobListComponent, pathMatch: 'full' },
  {
    path: ':jobId',
    children: [
      {
        path: '',
        component: JobDetailComponent,
        canActivate: [ClosedApplicationGuard],
        pathMatch: 'full',
      },
      {
        path: 'apply',
        component: JobApplicationComponent,
        canDeactivate: [ApplicationGuard],
        canActivate: [
          AuthGuard,
          ClosedApplicationGuard,
          UserAlreadyAppliedGuard,
        ],
      },
    ],
  },
];
