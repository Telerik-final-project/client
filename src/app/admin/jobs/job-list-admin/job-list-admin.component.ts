import { ComponentType } from '@angular/cdk/portal';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSnackBarConfig, MatSort, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { JobsService } from '../../../core/jobs.service';
import { SharedSnackModule } from '../../../shared/material/shared-snack.module';
import { JobAd } from './../../../models/job-ad';
import { JobCreateAdminDialogComponent } from './job-create-admin-dialog/job-create-admin-dialog.component';
import { JobListAdminDialogComponent } from './job-list-admin-dialog/job-list-admin-dialog.component';

@Component({
  selector: 'app-job-list-admin',
  templateUrl: './job-list-admin.component.html',
  styleUrls: ['./job-list-admin.component.css'],
})
export class JobListAdminComponent implements OnInit {
  public displayedColumns = [
    'id',
    'title',
    'createdAt',
    'view',
    'edit',
    'delete',
  ];
  public jobs = new MatTableDataSource<JobAd>();
  public length: number;
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  @ViewChild(MatSort) private sort: MatSort;
  private currentlyClickedRow: JobAd;
  private snackOptions = {
    duration: 2500,
    verticalPosition: 'top',
    horizontalPosition: 'center',
  } as MatSnackBarConfig;

  constructor(
    private jobsService: JobsService,
    private snack: SharedSnackModule,
    private router: Router,
    private dialog: MatDialog,
    public activatedRoute: ActivatedRoute,
  ) {}

  public initPaginator(): void {
    this.jobs.sort = this.sort;
    this.jobs.paginator = this.paginator;
  }

  public ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      window.setTimeout(() => {
        this.initPaginator();
      });

      this.jobs.data = data.jobs;
      this.length = this.jobs.data.length;

      if (this.length === 0) {
        this.snack.openSnackMsg(
          'No data available',
          'Close',
          this.snackOptions,
        );
      }
    });
  }

  private onDelete(id: number): void {
    this.openDialog(JobListAdminDialogComponent).subscribe(
      (isConfirmed: boolean) => {
        if (isConfirmed) {
          this.jobsService
            .delete(id, { responseType: 'json', observe: 'response' })
            .subscribe(
              () => {
                let index = 0;
                const found = this.jobs.data.find((job, i) => {
                  index = i;
                  return job.id === id;
                });
                this.jobs.data.splice(index, 1);
                this.jobs.paginator = this.paginator;
              },
              () => {
                this.snack.openSnackMsg(
                  'Oops, we encountered a server error! :(',
                  'Close',
                  this.snackOptions,
                );
              },
            );
        }
      },
    );
  }

  private onCreateAd(): void {
    this.openDialog(JobCreateAdminDialogComponent).subscribe((res: JobAd) => {
      if (res) {
        this.jobs.data.push(res);
        this.jobs.paginator = this.paginator;
      }
    });
  }

  private onView(id: number): void {
    this.router.navigate(['/jobs/' + id]);
  }

  private onEdit(id: number): void {
    this.jobsService.getById(id).subscribe((job) => {
      this.openDialog(JobCreateAdminDialogComponent, job).subscribe((x) => {
        console.log(x);
      });
    });
  }

  private openDialog(
    component: ComponentType<any>,
    jobData?: JobAd,
  ): Observable<any> {
    let dialogRef: MatDialogRef<Component>;

    if (jobData) {
      const dataToSend = {
        id: jobData.id,
        title: jobData.title,
        type_id: jobData.type_id,
        status: jobData.status,
        description: jobData.description,
        descriptionUrl: jobData.descriptionUrl,
      };
      dialogRef = this.dialog.open(component, {
        data: dataToSend,
        panelClass: ['admin-dialog'],
        closeOnNavigation: true,
        disableClose: true,
      });
    } else {
      dialogRef = this.dialog.open(component, {
        panelClass: ['admin-dialog'],
        disableClose: true,
      });
    }
    return dialogRef.beforeClose();
  }
}
