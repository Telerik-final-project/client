import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { JobsService } from './../../core/jobs.service';
import { JobAd } from './../../models/job-ad';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
})
export class JobDetailComponent implements OnInit {
  @Input()
  public job: JobAd;
  public jobId: number;

  constructor(private jobService: JobsService, private route: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params);
        this.jobId = +params.jobId;
        this.jobService.getById(this.jobId).subscribe((data) => {
          this.job = data;
          console.log(data);
          // this.jobService.setCurrentJob(this.job);
        });
      },
      (err) => {
        console.log(err);
      });
  }

}
