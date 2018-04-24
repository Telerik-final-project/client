import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobsService } from './../../core/jobs.service';
import { IJobAd } from './../../models/job-ad';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css'],
})
export class JobApplicationComponent implements OnInit {
  private job: IJobAd;
  private jobId: number;

  constructor(private jobsService: JobsService, private route: ActivatedRoute, private router: Router) { }

  public ngOnInit(): void {
    this.job = this.jobsService.getCurrentJob();
    if (!this.job) {
      this.route.params.subscribe((params: Params) => {
        console.log(params);
        this.jobId = +params.jobId;
        this.job = this.jobsService.getById(this.jobId);
        this.jobsService.setCurrentJob(this.job);
      });
    }
  }

}
