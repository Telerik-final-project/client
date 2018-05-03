import { Component, Injectable, OnInit } from '@angular/core';

import { AuthService } from './../core/auth.service';

import { JwtPayload } from './../models/jwt-payload';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

@Injectable()
export class NavbarComponent implements OnInit {
  public user: JwtPayload;
  constructor(public authService: AuthService) { }

  public ngOnInit(): void {
    this.user = this.authService.decodeToken();
  }

  public logout(): void {
    this.authService.logout();
    this.user = this.authService.decodeToken();
  }
}
