import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';
import { AppConfig } from '../config/app.config';
import { User } from '../models/user';
import { HttpOptions } from './../models/http-options';
import { JwtPayload } from './../models/jwt-payload';

@Injectable()
export class AuthService {

  private user: User;
  private userSubject = new Subject<User>();

  constructor(
    private httpClient: HttpClient, private appConfig: AppConfig,
    private jwtService: JwtHelperService, private router: Router,
  ) { }

  public login(user: User, options?: HttpOptions): Observable<object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/login`, user, options);
  }

  public register(user: User): Observable<object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/register`, user);
  }

  public isAuthenticated(): boolean {
    const token = this.jwtService.tokenGetter();
    const decoded = this.jwtService.decodeToken(token);
    return !!token && !this.jwtService.isTokenExpired(token) && decoded.iss === this.appConfig.jwtIssuer;
  }

  public isAdmin(): boolean {
    return this.isAuthenticated() && this.decodeToken().role === 'admin';
  }

  public logout(): void {
    localStorage.removeItem('access_token');
    this.nullUser();
    this.router.navigate(['/home']);
  }
  public clearLocalStorage(): void {
    return localStorage.removeItem('access_token');
  }

  public sendUser(user: User): void {
    this.userSubject.next(user);
  }

  public nullUser(): void {
    this.userSubject.next();
  }

  public getUser(): Observable<User> {
    return this.userSubject.asObservable();
  }

  public decodeToken(): JwtPayload {
    const token = this.jwtService.tokenGetter();
    return this.jwtService.decodeToken(token);
  }
}
