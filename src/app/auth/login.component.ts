import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';

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

  constructor(private auth: AuthService) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
    this.email = this.form.get('email');
    this.password = this.form.get('password');
  }

  private submit(form: FormGroup): void {
    console.log(form.value);
    this.auth.login(this.form.value, {observe: 'response', responseType: 'json'}).subscribe((x: HttpResponse<{token: string}>) => {
      console.log(x);
    });
  }

  private getErrorMessage(field: AbstractControl): string {
    if (field.hasError('required')) {
      return 'The field is required';
    } else if (field.hasError('email')) {
      return 'Invalid email';
    }
  }
}
