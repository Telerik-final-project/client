import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { JobsService } from './../core/jobs.service';
import { IJobAd } from './../models/job-ad';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css'],
})
export class JobListComponent implements OnInit {
  @Output()
  public jobs: IJobAd[];

  constructor(private jobsService: JobsService) {}

  public ngOnInit(): void {
    this.jobs = this.jobsService.getAll();
  }

}
