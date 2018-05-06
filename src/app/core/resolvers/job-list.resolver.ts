import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

import { JobAd } from './../../models/job-ad';
import { JobsService } from './../jobs.service';

@Injectable()
export class JobListResolver implements Resolve<JobAd[]> {
  constructor(private jobService: JobsService) {}
  public resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): JobAd[] | Observable<JobAd[]> | Promise<JobAd[]> {
    return this.jobService.getAll().catch(() => {
      return Observable.of([] as JobAd[]);
    });
  }
}
