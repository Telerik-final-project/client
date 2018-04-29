import { Component, OnInit, Input, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDynamicLinksForm } from '../_interfaces/create.edit.interface';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, IDynamicLinksForm {
  public form: FormGroup;
  public name: AbstractControl;
  public targetUrl: AbstractControl;
  public iconUrl: AbstractControl;
  public dropdown: AbstractControl;
  public hidden: AbstractControl;

  public isHidden: boolean = false;
  public dropdownValues: object[] = [
    { id: 'mat-option-0', selected: true, value: 'Social Link' },
    { id: 'mat-option-1', selected: false, value: 'Action Link' },
  ];

  public minLength: number = 3;
  public maxLength: number = 128;

  public selected: string = 'Social Link';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(this.minLength),
        Validators.maxLength(this.maxLength),
      ]],
      targetUrl: ['', [
        Validators.required,
      ]],
      iconUrl: ['', [
        Validators.required,
      ]],
      dropdown: [''],
      hidden: [''],
    });

    this.name = this.form.get('name');
    this.targetUrl = this.form.get('targetUrl');
    this.iconUrl = this.form.get('iconUrl');
    this.dropdown = this.form.get('dropdown');
    this.hidden = this.form.get('hidden');
  }

  public changeSelected($event: MouseEvent): void {
    this.selected = $event.toElement.innerHTML.trim();
  }

  public create(): void {
    const newButton: object = {
      name: this.form.value.name,
      target: this.form.value.targetUrl,
      link: this.form.value.iconUrl,
      type: this.selected,
      isHidden: this.isHidden,
      isDeleted: 0,
    };
  }

  public chidchangeVisibility(): void {
    this.isHidden = !this.isHidden;
  }

  public getErrorMessage(field: AbstractControl, fieldName?: string): string {
    if (field.hasError('required')) {
      return 'The field is required!';
    }

    if (!field.errors) {
      return null;
    }

    if (field.errors.minlength) {
      return `The ${fieldName} must be at least ${this.minLength} symbols!`;
    } else if (field.errors.maxlength) {
      return `The ${fieldName} must be less then ${this.maxLength} symbols!`;
    }

    return null;
  }
}
