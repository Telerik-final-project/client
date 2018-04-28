import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth.service';
import { User } from '../../../models/user';
import { IRegister } from '../interfaces/register.interface';

export class ValidateInputFields implements OnInit, IRegister {
    public registerForm: FormGroup;
    public username: AbstractControl;
    public email: AbstractControl;
    public password: AbstractControl;
    public password2: AbstractControl;

    public emailMaxLength: number;
    public minLength: number = 6;
    public passMaxLength: number = 256;

    // tslint:disable-next-line:no-empty
    constructor() { }

    // tslint:disable-next-line:no-empty
    public ngOnInit(): void { }

    public mainValidator(field: AbstractControl): string {
        if (field.hasError('required')) {
            return 'The field is required!';
        } else if (field.hasError('email')) {
            return 'Invalid email!';
        }
        return null;
    }

    public generalValidator(field: AbstractControl, fieldName?: string): any {
        if (field.errors) {
            if (field.errors.minlength) {
                const fieldLength = field.errors.minlength.requiredLength;

                return `Your ${fieldName} must be at least ${fieldLength} symbols!`;
            }
        }
        return null;
    }

    public passwordsFieldsValidator(registerForm: AbstractControl): boolean {
        this.username = registerForm.get('username');
        this.email = registerForm.get('email');
        this.password = registerForm.get('password');
        this.password2 = registerForm.get('password2');

        const validPasswordsForRegister: boolean = (
            (this.password.value.length > this.minLength) &&
            (this.password2.value.length > this.minLength)) &&
            (this.password.value === this.password2.value);

        if (validPasswordsForRegister && this.username.valid && this.email.valid) {
            this.password.setErrors(null);
            this.password2.setErrors(null);

            registerForm.updateValueAndValidity();
        }

        return validPasswordsForRegister;
    }

    public ifPasswordsMatch(field: AbstractControl): string {
        const password: AbstractControl = this.registerForm.get('password');
        const password2: AbstractControl = this.registerForm.get('password2');

        if (password.value !== password2.value) {
            const err = { errMsg: `Passwords doesn't match!` };

            password.setErrors(err);
            password2.setErrors(err);

            return err.errMsg;
        }
        return null;
    }
}
