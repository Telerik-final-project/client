import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';

import { AuthService } from './../auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivateChild, CanActivate {
  constructor(private authService: AuthService) {}

  public canActivateChild(): boolean {
    if (!this.authService.isAdmin()) {
      return false;
    }
    return true;
  }

  public canActivate(): boolean {
    if (!this.authService.isAdmin()) {
      return false;
    }
    return true;
  }
}
