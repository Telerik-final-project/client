import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobApplicationComponent } from './jobs/job-application/job-application.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { JobListComponent } from './jobs/job-list.component';

export const ROUTES: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'jobs', children: [
        { path: '', component: JobListComponent, pathMatch: 'full' },
        { path: ':jobId', children: [
            { path: '', component: JobDetailComponent, pathMatch: 'full' },
            { path: 'apply', component: JobApplicationComponent },
        ] },
    ]},
];
