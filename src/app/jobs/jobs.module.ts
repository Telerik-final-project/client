import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { SharedDialogModule } from '../shared/material/shared-dialog.module';
import { SharedPaginatorModule } from '../shared/material/shared-paginator.module';
import { SharedJobsModule } from './../shared/jobs/shared-jobs.module';
import { SharedIconModule } from './../shared/material/shared-icon.module';
import { SharedTableModule } from './../shared/material/shared-table.module';
import { SharedModule } from './../shared/shared.module';
import { JobsRoutingModule } from './routing/jobs-routing.module';

import { JobApplicationDialogComponent } from '../shared/jobs/job-application/job-application-dialog.component';
import { JobListComponent } from './job-list.component';
import { JobViewComponent } from './job-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    SharedJobsModule,
    SharedIconModule,
    SharedTableModule,
    SharedDialogModule,
    SharedPaginatorModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    JobsRoutingModule,
  ],
  declarations: [
    JobListComponent,
    JobViewComponent,
  ],
  entryComponents: [
    JobApplicationDialogComponent,
  ],
})
export class JobsModule { }
