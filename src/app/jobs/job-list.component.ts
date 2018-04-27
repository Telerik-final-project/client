import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material';

import { JobsService } from './../core/jobs.service';
import { JobAd } from './../models/job-ad';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  @Output()
  public jobs: JobAd[];
  public paginatedJobs: JobAd[];
  private length: number;
  private pageSize = 10;

  constructor(private jobsService: JobsService) {}

  public onChangePage(event: PageEvent): void {
    const copy = this.jobs.slice();
    this.paginatedJobs = copy.slice(event.pageIndex * event.pageSize, (event.pageIndex * event.pageSize) + event.pageSize);
  }
  public ngOnInit(): void {
    this.jobsService.getAll().subscribe((data) => {
      this.jobs = data;
      this.length = this.jobs.length;

      this.onChangePage({pageIndex: 0, length: this.length, pageSize: this.pageSize});
    });
  }

}
