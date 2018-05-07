import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDatepickerInputEvent, MatPaginator, MatSnackBarConfig, PageEvent } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

import { JobType } from '../models/job-type';
import { JobAd } from './../models/job-ad';

import { AuthService } from './../core/auth.service';
import { JobTypesService } from './../core/job-types.service';
import { JobsService } from './../core/jobs.service';

import { SharedSnackModule } from './../shared/material/shared-snack.module';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  public jobs: JobAd[];
  public paginatedJobs: JobAd[];
  public length: number;
  public pageSize = 10;
  public keyword: string;
  public jobTypes: JobType[];
  public selectedCategory = 'none';
  public userInput: string;
  public startDateInput: string;
  public endDateInput: string;
  private startDate = '01/01/1970';
  private endDate = '11/30/2070';
  private defaultPageSize = 10;
  private snackOptions = {
    duration: 2500,
    verticalPosition: 'top',
    horizontalPosition: 'center',
  } as MatSnackBarConfig;
  @ViewChild(MatPaginator) private paginator: MatPaginator;
  private pageEvent: PageEvent;

  constructor(
    public jobsService: JobsService,
    public snack: SharedSnackModule,
    public authService: AuthService,
    public jobTypesService: JobTypesService,
    public activatedRoute: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.jobsService.getAll().subscribe((data) => {
      if (this.authService.isAdmin()) {
        this.jobs = data;
        this.length = this.jobs.length;
      } else {
        const filtered =  data.filter((job: JobAd) => job.status === 'open');
        this.jobs = filtered;
        this.length = filtered.length;
      }

      if (this.length === 0) {
        this.snack.openSnackMsg('There are no open positions - please try later', 'Close', this.snackOptions);
      }
      this.onChangePage(this.jobs, {
        pageIndex: 0,
        length: this.length,
        pageSize: this.pageSize,
      });
    });

    this.jobTypesService.getAll().subscribe((jobTypes: JobType[]) => {
      this.jobTypes = jobTypes;
    });
  }

  public onChangePage(jobs: JobAd[], event: PageEvent): void {
    const copy = jobs.slice();
    this.pageSize = copy.length > this.defaultPageSize ? this.defaultPageSize : copy.length;
    this.length = copy.length;

    const sliceStart = event.pageIndex > 0 ? event.pageIndex * event.pageSize + 1 : event.pageIndex * event.pageSize;
    const sliceEnd = event.pageIndex * event.pageSize + event.pageSize + 1;

    this.paginatedJobs = copy.slice(sliceStart, sliceEnd);
  }

  private filterJobs(input: string): void {
    const copy = this.jobs.slice();
    this.userInput = input;
    this.paginatedJobs = this.jobsService.filter(copy, input, this.selectedCategory, this.startDate, this.endDate);
    this.onChangePage(this.paginatedJobs, {pageIndex: 0, pageSize: 10} as PageEvent);
    if (this.paginatedJobs.length === 0) {
      this.snack.openSnackMsg('There are no open positions with these criteria', 'Close', this.snackOptions);
    } else {
      this.snack.dismissSnackMsg();
    }
  }

  private onStartDateChanged(event: MatDatepickerInputEvent<Date>): void {
    const input = event.targetElement as HTMLInputElement;
    this.startDate = input.value;
    this.filterJobs(this.userInput);
  }
  private onEndDateChanged(event: MatDatepickerInputEvent<Date>): void {
    const input = event.targetElement as HTMLInputElement;
    this.endDate = input.value;
    this.filterJobs(this.userInput);
  }

  private clearFilters(): void {
    this.keyword = '';
    this.selectedCategory = 'none';
    this.paginatedJobs = this.jobs.slice();
    this.startDate = '01/01/1970';
    this.endDate = '11/30/2070';
    this.startDateInput = '';
    this.endDateInput = '';
    this.length = this.paginatedJobs.length;
    this.onChangePage(this.jobs, {
      pageIndex: 0,
      length: this.length,
      pageSize: this.pageSize,
    } as PageEvent);

    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
}
