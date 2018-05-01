import { Component, Injectable, OnInit } from '@angular/core';

import { AuthService } from './../core/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

@Injectable()
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService) { }

  public ngOnInit(): void {
    console.log(this.authService.isAuthenticated());
  }

  public logout(): void {
    this.authService.logout();
  }
}
