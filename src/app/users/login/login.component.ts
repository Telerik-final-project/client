import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { JwtPayload } from './../../models/jwt-payload';
import { User } from './../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public email: AbstractControl;
  public password: AbstractControl;
  public credentialsError: string;
  public returnUrl: string;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    this.email = this.form.get('email');
    this.password = this.form.get('password');
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/home';
  }

  private submit(form: FormGroup): void {
    this.auth.login(this.form.value, { observe: 'response', responseType: 'json' }).subscribe(
      (x: HttpResponse<{ token: string }>) => {
        localStorage.setItem('access_token', x.body.token);
        this.credentialsError = null;
        this.router.navigateByUrl(this.returnUrl);

        const decoded: JwtPayload = this.auth.decodeToken();
        this.auth.sendUser({email: decoded.email} as User);
      },
      (err: HttpErrorResponse) => {
        this.credentialsError = err.error.err;
      });
  }

  private getErrorMessage(field: AbstractControl): string {
    if (field.hasError('required')) {
      return 'The field is required!';
    } else if (field.hasError('email')) {
      return 'Invalid email!';
    }
  }
}
