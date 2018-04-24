import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../core/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  register(user: User) {
    this.httpClient.post('http://localhost:3012/api/register', { user }).subscribe((x) => x);
  }

}
