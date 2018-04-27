import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from './../auth.service';

@Injectable()
export class ClosedApplicationGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    public canActivate(): boolean {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/home']);
            return false;
        }
        return true;
    }
}
