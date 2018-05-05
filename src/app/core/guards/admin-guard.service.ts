import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './../auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivateChild, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  public canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

  public canActivate(): boolean {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }
}
