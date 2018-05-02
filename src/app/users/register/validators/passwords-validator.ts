import { AbstractControl } from '@angular/forms';

import { IRegisterMatch } from '../_interfaces/match.interface';
import { IValidator } from '../_interfaces/validator.interface';

export class RegisterValidator implements IValidator {
    public validate(field: AbstractControl): string {
        const password: AbstractControl = field.get('password').value;
        const password2: AbstractControl = field.get('password2').value;

        if (/"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}"/g.test(password + '')) {
            password.setErrors({ passwordMatch: true });
        } else if (/"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}"/g.test(password2 + '')) {
            password2.setErrors({ passwordValidate: true });
        }

        return null;
    }
}
// "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}"