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
import { JobListComponent } from './job-list.component';
import { JobViewComponent } from './job-view.component';
import { JobsRoutingModule } from './routing/jobs-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    SharedDialogModule,
    SharedJobsModule,
    SharedPaginatorModule,
    SharedTableModule,
    SharedIconModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    JobsRoutingModule,
  ],
  declarations: [
    JobListComponent, JobViewComponent,

  ],
  entryComponents: [
  ],
})
export class JobsModule { }
