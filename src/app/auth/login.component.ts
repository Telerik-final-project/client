import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  private form: FormGroup;
  private email: AbstractControl;
  private password: AbstractControl;
  private credentialsError: string;
  private returnUrl: string;

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
        this.credentialsError = undefined;
        this.router.navigateByUrl(this.returnUrl);
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
