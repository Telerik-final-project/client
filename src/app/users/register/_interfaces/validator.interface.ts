import { AbstractControl } from '@angular/forms';

export interface IValidator {
    validate(field: AbstractControl): string;
}
