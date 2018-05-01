import { CdkColumnDef } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckbox,
  MatDatepickerModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
} from '@angular/material';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { JobApplicationDialogComponent } from './job-application/job-application-dialog.component';
import { JobApplicationComponent } from './job-application/job-application.component';
import { JobDetailComponent } from './job-detail/job-detail.component';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { SharedDialogModule } from '../material/shared-dialog.module';
import { SharedModule } from '../shared.module';

@NgModule({
  declarations: [
    JobDetailComponent,
    JobApplicationComponent,
    JobApplicationDialogComponent,
  ],
  imports: [SharedModule, RouterModule, SharedDialogModule],
})
export class SharedJobsModule {}
