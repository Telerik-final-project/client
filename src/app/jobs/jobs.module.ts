import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { JobApplicationComponent } from './job-application/job-application.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobListComponent } from './job-list.component';
import { JobViewComponent } from './job-view.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [JobListComponent, JobDetailComponent, JobApplicationComponent, JobViewComponent],
  exports: [
    JobListComponent, JobDetailComponent, JobApplicationComponent, JobViewComponent,
  ],
})
export class JobsModule { }
