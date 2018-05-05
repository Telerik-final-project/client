import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { AppConfig } from '../config/app.config';
import { User } from '../models/user';
import { HttpOptions } from './../models/http-options';
import { JwtPayload } from './../models/jwt-payload';

@Injectable()
export class AuthService {
  public userLoggedObservable: Observable<User>;
  private userLoggedEvent: BehaviorSubject<User>;

  constructor(
    private httpClient: HttpClient,
    private appConfig: AppConfig,
    private jwtService: JwtHelperService,
    private router: Router,
  ) {
    this.userLoggedEvent = new BehaviorSubject<User>(this.getUser());
    this.userLoggedObservable = this.userLoggedEvent.asObservable();
  }

  public login(user: User, options?: HttpOptions): Observable<object> {
    return this.httpClient.post(
      `${this.appConfig.apiUrl}/login`,
      user,
      options,
    );
  }

  public register(user: User): Observable<object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/register`, user);
  }

  public isAuthenticated(): boolean {
    const token = this.jwtService.tokenGetter();
    const decoded = this.jwtService.decodeToken(token);
    return (
      !!token &&
      !this.jwtService.isTokenExpired(token) &&
      decoded.iss === this.appConfig.jwtIssuer
    );
  }

  public isAdmin(): boolean {
    return this.isAuthenticated() && this.decodeToken().role === 'admin';
  }

  public logout(): void {
    this.clearStorage();
    this.nullUser();
    this.router.navigate(['/home']);
  }
  public clearStorage(): void {
    localStorage.removeItem('access_token');
    sessionStorage.removeItem('access_token');
  }

  public sendUser(user: User): void {
    this.userLoggedEvent.next(user);
  }

  public nullUser(): void {
    this.userLoggedEvent.next(null);
  }

  public getUser(): User {
    const decoded = this.decodeToken();
    if (decoded) {
      return {
        email: decoded.email,
      } as User;
    }

    return null;
  }

  public decodeToken(): JwtPayload {
    const token = this.jwtService.tokenGetter();
    if (token) {
      return this.jwtService.decodeToken(token);
    }
  }
}
