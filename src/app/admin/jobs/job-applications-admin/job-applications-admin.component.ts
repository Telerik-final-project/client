import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

import { saveAs } from 'file-saver';

import { ApplicationsService } from '../../../core/applications.service';
import { JobApplication } from './../../../models/job-application';
import { SharedSnackModule } from './../../../shared/material/shared-snack.module';

@Component({
  selector: 'app-job-applications-admin',
  templateUrl: './job-applications-admin.component.html',
  styleUrls: ['./job-applications-admin.component.css'],
})
export class JobApplicationsAdminComponent implements OnInit {
  public displayedColumns = [
    'id',
    'name',
    'email',
    'comment',
    'createdAt',
    'cv',
    'coverLetter',
  ];
  public applications = new MatTableDataSource<JobApplication>();
  public length: number;
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) private sort: MatSort;
  constructor(
    private route: ActivatedRoute,
    private applicationService: ApplicationsService,
    private snack: SharedSnackModule,
  ) {}

  public initPaginator(): void {
    this.applications.sort = this.sort;
    this.applications.paginator = this.paginator;
  }

  public ngOnInit(): void {
    const jobId = this.route.params.subscribe((x) => {
      this.applicationService.getJobApplications(x.jobId).subscribe((data) => {
        window.setTimeout(() => {
          this.initPaginator();
        });

        this.applications.data = data;
        this.length = this.applications.data.length;

        if (this.length === 0) {
          this.snack.openSnackMsg('No data available', 'Close', {
            duration: 2500,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }
      });
    });
  }

  private download(url: string): void {
    if (url) {
      const fileArray = url.split('/');
      const file = fileArray[fileArray.length - 1];
      this.applicationService
        .downloadFile(file)
        .subscribe((response: HttpResponse<string>) => {
          saveAs(response.body, file);
        });
    }
  }
}
