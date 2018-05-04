import { Component, Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';
import { User } from '../models/user';
import { AuthService } from './../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

@Injectable()
export class NavbarComponent implements OnInit, OnDestroy {
  public panelOpenState: boolean = false;
  public user: User;
  private subscription: Subscription;
  constructor(public authService: AuthService) { }

  public ngOnInit(): void {
    this.subscription = this.authService.getUser().subscribe((user) => {
      this.user = user;
    });
  }

  public logout(): void {
    this.authService.logout();
    this.authService.nullUser();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
