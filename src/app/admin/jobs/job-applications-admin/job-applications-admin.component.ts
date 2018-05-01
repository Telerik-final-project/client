import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';

import { saveAs } from 'file-saver';

import { ApplicationsService } from '../../../core/applications.service';
import { JobApplication } from './../../../models/job-application';

@Component({
  selector: 'app-job-applications-admin',
  templateUrl: './job-applications-admin.component.html',
  styleUrls: ['./job-applications-admin.component.css'],
})
export class JobApplicationsAdminComponent implements OnInit {
  public displayedColumns = ['id', 'name', 'comment', 'createdAt', 'cv', 'coverLetter'];
  public applications = new MatTableDataSource<JobApplication>();
  public length: number;
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) private sort: MatSort;
  constructor(private route: ActivatedRoute, private applicationService: ApplicationsService, private snackMsg: MatSnackBar) { }

  public initPaginator(): void {
    this.applications.sort = this.sort;
    this.applications.paginator = this.paginator;
  }

  public ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.applicationService.getJobApplications(param.jobId).subscribe((response) => {
        window.setTimeout(() => {
          this.initPaginator();
        });

        this.applications.data = response;
        this.length = this.applications.data.length;

        if (this.length === 0) {
          this.openSnackMsg('No data available');
        }
      });
    });
  }

  private openSnackMsg(msg: string): void {
    this.snackMsg.open(msg, 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  private download(url: string): void {
    if (url) {
      const fileArray = url.split('/');
      const file = fileArray[fileArray.length - 1];
      this.applicationService.downloadFile(file).subscribe((response: HttpResponse<string>) => {
        saveAs(response.body, file);
      });
    }
  }

}
