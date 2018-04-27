import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../core/auth.service';
import { PasswordValidation } from '../core/validate-passwords.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;
  private username: AbstractControl;
  private email: AbstractControl;
  private password: AbstractControl;
  private password2: AbstractControl;
  private comparedPasswords: string = '';
  private errors: string;

  constructor(private authService: AuthService, private formBuilder: FormBuilder) { }

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(+'6'), Validators.maxLength(+'1024')]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(+'6'), Validators.maxLength(+'256'), Validators.required]],
      password2: ['', [Validators.minLength(+'6'), Validators.required]],
    }, {
        Validators: PasswordValidation.MatchPasswords,
      });

    this.username = this.registerForm.get('username');
    this.email = this.registerForm.get('email');
    this.password = this.registerForm.get('password');
    this.password2 = this.registerForm.get('password2');
  }

  private register(): void {
    const newUser = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    console.log(newUser);
    this.authService.register(newUser).subscribe(
      (x) => console.log(x),
      (err: HttpErrorResponse) => this.errors = err.error.err);
  }

  private getErrorMessage(field: AbstractControl, fieldName?: string): string {
    if (field.hasError('required')) {
      return 'The field is required!';
    } else if (field.hasError('email')) {
      return 'Invalid email!';
    }

    if (field.errors) {
      if (field.errors.minlength) {
        const fieldLength = field.errors.minlength.requiredLength;

        return `Your ${fieldName} must be at least ${fieldLength} symbols!`;
      }
    }
  }

  private comparePasswords(): string {
    if (!PasswordValidation.MatchPasswords(this.registerForm)) {
      return `Passwords doesn't match`;
    }

    return '';
  }
}
