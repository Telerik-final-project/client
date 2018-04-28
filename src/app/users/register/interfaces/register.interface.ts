import { AbstractControl, FormGroup } from '@angular/forms';

export interface IRegister {
    registerForm: FormGroup;
    username: AbstractControl;
    email: AbstractControl;
    password: AbstractControl;
    password2: AbstractControl;

    emailMaxLength: number;
    minLength: number;
    passMaxLength: number;
}
