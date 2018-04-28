import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';

import { AuthService } from './../auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivateChild {
    constructor(private authService: AuthService) {}

    public canActivateChild(): boolean {
        if (!this.authService.isAdmin()) {
            this.authService.clearLocalStorage();
            return false;
        }
        return true;
    }
}
