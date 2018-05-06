import { AbstractControl, FormGroup } from '@angular/forms';

export interface IContactForm {
    form: FormGroup;
    name: AbstractControl;
    address: AbstractControl;
    isMapAddess?: AbstractControl;
    isNotMapAddess?: AbstractControl;
}
