import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../config/app.config';
import { User } from '../models/user';
import { HttpOptions } from './../models/http-options';
import { JwtPayload } from './../models/jwt-payload';

@Injectable()
export class AuthService {
  public isAuth: boolean;

  constructor(
    private httpClient: HttpClient, private appConfig: AppConfig,
    private jwtService: JwtHelperService, private router: Router) { }

  public login(user: User, options?: HttpOptions): Observable<object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/login`, user, options);
  }

  public register(user: User): Observable<object> {
    console.log(user);
    console.log(this.appConfig.apiUrl);
    return this.httpClient.post('http://localhost:3012/api/register', {});
  }

  public isAuthenticated(): boolean {
    const token = this.jwtService.tokenGetter();
    const decoded = this.jwtService.decodeToken(token);
    return !!token && !this.jwtService.isTokenExpired(token) && decoded.iss === this.appConfig.jwtIssuer;
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/home']);
  }
  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public decodeToken(): JwtPayload {
    const token = this.jwtService.tokenGetter();
    return this.jwtService.decodeToken(token);
  }
}
