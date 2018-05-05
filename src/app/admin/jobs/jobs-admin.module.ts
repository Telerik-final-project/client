import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { SharedDialogModule } from '../../shared/material/shared-dialog.module';
import { SharedIconModule } from '../../shared/material/shared-icon.module';
import { SharedPaginatorModule } from '../../shared/material/shared-paginator.module';
import { SharedTableModule } from '../../shared/material/shared-table.module';
import { SharedModule } from '../../shared/shared.module';
import { SharedJobsModule } from './../../shared/jobs/shared-jobs.module';
import { JobsAdminRoutingModule } from './routing/jobs-admin-routing.module';

import { JobApplicationDialogComponent } from './../../shared/jobs/job-application/job-application-dialog.component';
import { JobApplicationsAdminComponent } from './job-applications-admin/job-applications-admin.component';
import { JobCreateAdminDialogComponent } from './job-list-admin/job-create-admin-dialog/job-create-admin-dialog.component';
import { JobListAdminDialogComponent } from './job-list-admin/job-list-admin-dialog/job-list-admin-dialog.component';
import { JobListAdminComponent } from './job-list-admin/job-list-admin.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SharedJobsModule,
    RouterModule,
    SharedDialogModule,
    SharedPaginatorModule,
    SharedTableModule,
    SharedIconModule,
    FroalaEditorModule.forRoot(),
    FroalaViewModule.forRoot(),
    JobsAdminRoutingModule,
  ],
  declarations: [
    JobListAdminComponent,
    JobListAdminDialogComponent,
    JobCreateAdminDialogComponent,
    JobApplicationsAdminComponent,
  ],
  entryComponents: [
    JobApplicationDialogComponent,
    JobListAdminDialogComponent,
    JobCreateAdminDialogComponent,
  ],
})
export class JobsAdminModule { }
