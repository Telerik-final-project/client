import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApplicationsService } from '../applications.service';
import { AuthService } from './../auth.service';


@Injectable()
export class UserAlreadyAppliedGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private applicationService: ApplicationsService,
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = this.authService.decodeToken();
    const jobId = route.params.jobId;

    if (this.authService.isAdmin()) {
      return true;
    }

    this.applicationService
      .isUserAppliedForJob(user.sub, jobId, {
        observe: 'response',
        responseType: 'json',
      })
      .subscribe((res) => {
        if (res) {

          return true;
        }
        return false;
      });
  }
}
