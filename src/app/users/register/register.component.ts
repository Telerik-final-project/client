import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';
import { IRegister } from './_interfaces/register.interface';
import { ValidateInputFields } from './validators/passwords-validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RegisterComponent extends ValidateInputFields implements OnInit, IRegister {
  public registerForm: FormGroup;
  public username: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public password2: AbstractControl;

  public emailMaxLength = 1024;
  public minLength = 6;
  public passMaxLength = 256;

  private errors: any = '';
  private validPass: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {
    super();
  }

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [
        Validators.minLength(this.minLength),
        Validators.required],
      ],
      email: ['', [
        Validators.maxLength(this.emailMaxLength),
        Validators.email,
        Validators.required],
      ],
      password: ['', [
        Validators.minLength(this.minLength),
        Validators.maxLength(this.passMaxLength),
        Validators.required],
      ],
      password2: ['', [
        Validators.required],
      ],
    });

    this.username = this.registerForm.get('username');
    this.email = this.registerForm.get('email');
    this.password = this.registerForm.get('password');
    this.password2 = this.registerForm.get('password2');
  }

  private register(): void {
    if (this.password.value !== this.password2.value) {
      this.validPass = 'Doesnt match';
      return;
    }

    const newUser = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    this.errors = this.authService.register(newUser).subscribe(
      (x) => console.log(x),
      (err: HttpErrorResponse) => this.errors = err.error.err);

    console.log(this.errors);

    if (!this.errors) {
      this.router.navigateByUrl('/users/login');
    }
  }

  private getErrorMessage(field: AbstractControl, fieldName?: string): string {
    if (fieldName === 'password' || fieldName === 'password2') {
      const ifPasswordsMatch = this.ifPasswordsMatch(field);
      if (ifPasswordsMatch) { return ifPasswordsMatch; }
    }

    const passwordsValidation = this.passwordsFieldsValidator(this.registerForm);
    if (passwordsValidation) { return ''; }

    const mainValidation = this.mainValidator(field);
    if (mainValidation) { return mainValidation; }

    const generalValidation: string = this.generalValidator(field, fieldName);
    if (generalValidation) { return generalValidation; }
  }
}
