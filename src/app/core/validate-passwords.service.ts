import { AbstractControl } from '@angular/forms';

export class PasswordValidation {
    public static MatchPasswords(AC: AbstractControl): boolean {
        const password = AC.get('password');
        const password2 = AC.get('password2');

        if ((password.value === password2.value) && (password2.valid)) {
            return true;
        }
        return false;
    }
}
