import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';

import { AuthService } from '../../core/auth.service';
import { SharedSnackModule } from '../../shared/material/shared-snack.module';

import { JwtPayload } from '../../models/jwt-payload';
import { User } from '../../models/user';
import { IRegisterMatch } from './_interfaces/match.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  public registerForm: FormGroup;
  public username: AbstractControl;
  public email: AbstractControl;
  public password: AbstractControl;
  public password2: AbstractControl;

  public emailMaxLength = 1024;
  public minLength = 6;
  public passMaxLength = 256;

  private pattern: RegExp = new RegExp(
    '(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}',
  );

  private snackOptions = {
    duration: 3700,
    verticalPosition: 'top',
    horizontalPosition: 'center',
  } as MatSnackBarConfig;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snack: SharedSnackModule,
    private jwtService: JwtHelperService,
    @Inject('IRegisterMatch') private passwordsValidator: IRegisterMatch,
  ) {}

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        username: [
          '',
          [Validators.minLength(this.minLength), Validators.required],
        ],
        email: [
          '',
          [
            Validators.maxLength(this.emailMaxLength),
            Validators.email,
            Validators.required,
          ],
        ],
        password: [
          '',
          [
            Validators.minLength(this.minLength),
            Validators.maxLength(this.passMaxLength),
            Validators.required,
          ],
        ],
        password2: [
          '',
          [Validators.required, Validators.pattern(this.pattern)],
        ],
      },
      {
        validator: [this.passwordsValidator.passwordsMatch],
      },
    );

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

    this.authService.register(newUser).subscribe(
      (x) => console.log(x),
      (err: HttpErrorResponse) => {
        if (err.error.msd) {
          this.snack.openSnackMsg(
            'Email already exists!',
            'Close',
            this.snackOptions,
          );
        }

        if (!err) {
          this.router.navigateByUrl('/users/login');
        }
      },
      () => {
        const userToLog = {
          email: newUser.email,
          password: newUser.password,
        };

        this.authService
          .login(userToLog, { observe: 'response', responseType: 'json' })
          .subscribe(
            (x: HttpResponse<{ token: string }>) => {
              const decoded: JwtPayload = this.jwtService.decodeToken(
                x.body.token,
              );
              localStorage.setItem('access_token', x.body.token);
              this.authService.sendUser({ email: decoded.email } as User);
              this.router.navigate(['/home']);
            },
            (err: HttpErrorResponse) => {
              console.log(err.error.err);
            },
          );
      },
    );
  }

  private getErrorMessage(field: AbstractControl, fieldName?: string): string {
    if (field.hasError('required')) {
      return `${fieldName} is required!`;
    } else if (field.hasError('email')) {
      return 'Invalid email!';
    } else if (field.hasError('pattern')) {
      return 'Plaese, write valid password!';
    } else if (field.hasError('minlength')) {
      const fieldLength = field.errors.minlength.requiredLength;

      return `Your ${fieldName} must be at least ${fieldLength} symbols!`;
    } else if (field.hasError('passwordMatch')) {
      return 'Passwords don`t match!';
    }
    return null;
  }
}
