import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedPaginatorModule } from '../shared/material/shared-paginator.module';
import { SharedIconModule } from './../shared/material/shared-icon.module';
import { SharedTableModule } from './../shared/material/shared-table.module';
import { SharedDialogModule } from './../shared/shared-dialog.module';
import { SharedModule } from './../shared/shared.module';

import { JobListAdminDialogComponent } from './job-admin/job-list-admin/job-list-admin-dialog/job-list-admin-dialog.component';
import { JobListAdminComponent } from './job-admin/job-list-admin/job-list-admin.component';
import { JobApplicationDialogComponent } from './job-application/job-application-dialog.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobListComponent } from './job-list.component';
import { JobViewComponent } from './job-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    SharedDialogModule,
    SharedPaginatorModule,
    SharedTableModule,
    SharedIconModule,
  ],
  declarations: [
    JobListComponent, JobDetailComponent, JobApplicationComponent, JobViewComponent,
    JobApplicationDialogComponent,
    JobListAdminComponent,
    JobListAdminDialogComponent,
  ],
  entryComponents: [
    JobApplicationDialogComponent, JobListAdminDialogComponent,
  ],
})
export class JobsModule { }
