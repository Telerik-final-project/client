import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { AuthService } from './core/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private slimLoadingBarService: SlimLoadingBarService) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.RoutesEventHandler(event);
    });

  }

  public ngOnInit(): void {
    const user = this.authService.decodeToken();

    if (user) {
      this.authService.sendUser({email: user.email} as User);
    }
  }

  private RoutesEventHandler(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.slimLoadingBarService.start();
    }
    if (event instanceof NavigationEnd) {
      this.slimLoadingBarService.stop();
      this.slimLoadingBarService.complete();
    }
  }
}
