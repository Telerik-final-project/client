import { AbstractControl, FormGroup } from '@angular/forms';

export interface IRegisterMatch {
    passwordsMatch(field: AbstractControl): string;
}
