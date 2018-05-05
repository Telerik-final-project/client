import { Component, OnInit } from '@angular/core';

import { AuthService } from './core/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  public ngOnInit(): void {
    const user = this.authService.decodeToken();

    if (user) {
      this.authService.sendUser({email: user.email} as User);
    }
  }
}
