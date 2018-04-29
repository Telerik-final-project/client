import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { SharedPaginatorModule } from '../shared/material/shared-paginator.module';
import { SharedIconModule } from './../shared/material/shared-icon.module';
import { SharedTableModule } from './../shared/material/shared-table.module';
import { SharedDialogModule } from './../shared/shared-dialog.module';
import { SharedModule } from './../shared/shared.module';

import { JobCreateAdminDialogComponent } from './job-admin/job-list-admin/job-create-admin-dialog/job-create-admin-dialog.component';
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
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
  ],
  declarations: [
    JobListComponent, JobDetailComponent, JobApplicationComponent, JobViewComponent,
    JobApplicationDialogComponent,
    JobListAdminComponent,
    JobListAdminDialogComponent,
    JobCreateAdminDialogComponent,
  ],
  entryComponents: [
    JobApplicationDialogComponent, JobListAdminDialogComponent, JobCreateAdminDialogComponent,
  ],
})
export class JobsModule { }
