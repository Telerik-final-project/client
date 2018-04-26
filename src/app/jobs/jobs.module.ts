import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedDialogModule } from './../shared/shared-dialog.module';
import { SharedModule } from './../shared/shared.module';

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
  ],
  declarations: [JobListComponent, JobDetailComponent, JobApplicationComponent, JobViewComponent, JobApplicationDialogComponent ],
  entryComponents: [
    JobApplicationDialogComponent,
  ],
})
export class JobsModule { }
