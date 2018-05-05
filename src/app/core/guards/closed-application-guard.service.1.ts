import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AuthService } from './../auth.service';
import { JobsService } from './../jobs.service';

@Injectable()
export class ClosedApplicationGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private jobsService: JobsService,
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.jobsService.getById(route.params.jobId).pipe(map((x) => {
      if (x.status === 'closed' && !this.authService.isAdmin()) {
        this.router.navigate(['/home']);
        return false;
      }
      return true;
    }));
  }
}
