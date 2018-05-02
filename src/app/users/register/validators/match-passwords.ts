import { AbstractControl } from '@angular/forms';

import { IRegisterMatch } from '../_interfaces/match.interface';

export class RegisterMatch implements IRegisterMatch {
    public passwordsMatch(field: AbstractControl): string {
        const password: AbstractControl = field.get('password');
        const password2: AbstractControl = field.get('password2');

        if (password.value !== password2.value) {
            password2.setErrors({ passwordMatch: true });
        }

        return null;
    }
}
