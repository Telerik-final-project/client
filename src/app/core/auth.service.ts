import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import { User } from '../models/user';
import { HttpOptions } from './../models/http-options';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient, private appConfig: AppConfig) { }

  public register(user: User): Observable<object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/register`, user);
  }

  public login(user: User, options?: HttpOptions): Observable<object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/login`, user, options);
  }

  public currentUser() { }
}
