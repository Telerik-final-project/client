import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Params, Router } from '@angular/router';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { JobAd } from './../../models/job-ad';
import { AuthService } from './../auth.service';
import { JobsService } from './../jobs.service';

@Injectable()
export class ClosedApplicationGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private jobsService: JobsService,
  ) { }

  public canActivate(routeSnapshot: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.jobsService.getById(routeSnapshot.params.jobId).pipe(map((x) => {
      if (x.status === 'closed' && !this.authService.isAdmin()) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }));
  }
}
