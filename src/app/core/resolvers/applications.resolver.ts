import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { JobApplication } from './../../models/job-application';
import { ApplicationsService } from './../applications.service';

@Injectable()
export class ApplicationsResolver implements Resolve<JobApplication[]> {
  constructor(private applicationService: ApplicationsService) {}
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): JobApplication[] | Observable<JobApplication[]> | Promise<JobApplication[]> {
    const jobId = +route.params.jobId;
    return this.applicationService.getJobApplications(jobId).catch(() => {
      return Observable.of([] as JobApplication[]);
    });
  }
}
