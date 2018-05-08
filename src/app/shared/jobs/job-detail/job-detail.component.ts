import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApplicationsService } from '../../../core/applications.service';
import { JobsService } from '../../../core/jobs.service';
import { JobAd } from '../../../models/job-ad';
import { AuthService } from './../../../core/auth.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
})
export class JobDetailComponent implements OnInit {
  @Input() public job: JobAd;
  public jobId: number;
  public isUserApplied: boolean;

  constructor(
    private jobService: JobsService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService,
    private applicationService: ApplicationsService,
  ) {}

  public ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.jobId = +params.jobId;
        this.jobService.getById(this.jobId).subscribe((data) => {
          this.job = data;
        });
      },
      (err) => {
        console.log(err);
      },
    );

    const user = this.authService.decodeToken();

    if (user) {
      if (user.role === 'user') {
        this.applicationService
          .isUserAppliedForJob(user.sub, this.jobId, {
            observe: 'response',
            responseType: 'json',
          })
          .subscribe((res: {body: boolean}) => {
            this.isUserApplied = res.body;
          });
      }
    }
  }

  private navigateToApplications(): void {
    this.router.navigate(['/admin', this.jobId, 'applications']);
  }
}
