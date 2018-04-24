import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../config/app.config';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  register(user: User): Observable<object> {
    console.log(user);
    console.log(this.appConfig.apiUrl);
    return this.httpClient.post('http://localhost:3012/api/register', {});
  }
}
