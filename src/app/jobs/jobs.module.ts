import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { JobApplicationComponent } from './job-application/job-application.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobListComponent } from './job-list.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [JobListComponent, JobDetailComponent, JobApplicationComponent],
})
export class JobsModule { }
