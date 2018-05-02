import { AbstractControl, FormGroup } from '@angular/forms';

export interface IDynamicButtonsForm {
    form: FormGroup;
    name: AbstractControl;
    targetUrl: AbstractControl;
    iconUrl: AbstractControl;
    dropdown: AbstractControl;
    hidden: AbstractControl;

    isHidden: boolean;

    dropdownValues: object[];

    minLength: number;
    maxLength: number;
}
