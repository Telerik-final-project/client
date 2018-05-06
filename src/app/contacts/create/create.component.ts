import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ContactsService } from '../../core/contacts.service';

import { IContact } from '../_interfaces/contact.interface';
import { IContactForm } from '../_interfaces/create-edit-form.interface';

import { icons } from './../../shared/material/shared-icon-names.module';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit, IContactForm {
  public form: FormGroup;
  public name: AbstractControl;
  public address: AbstractControl;
  public isMapAddess: AbstractControl;

  public isHidden: boolean = false;

  public minLength: number = 2;
  public nameMaxLength: number = 128;
  public addressMaxLength: number = 1024;

  constructor(
    private formBuilder: FormBuilder,
    private contactsService: ContactsService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(this.minLength),
        Validators.maxLength(this.nameMaxLength),
      ]],
      address: ['', [
        Validators.required,
        Validators.minLength(this.minLength),
        Validators.maxLength(this.addressMaxLength),
      ]],
      isMapAddess: [''],
    });

    this.name = this.form.get('name');
    this.address = this.form.get('address');
    this.isMapAddess = this.form.get('isMapAddess');
  }

  public create(): void {
    const newConatct: IContact = {
      name: this.form.value.name,
      address: this.form.value.address,
      status: this.form.value.isMapAddess || 0,
    };

    console.log(newConatct);
    this.contactsService
      .create(newConatct, { observe: 'response', responseType: 'json' })
      .subscribe((params: Params) => console.log(params));

    this.router.navigateByUrl('/admin/contacts');
  }

  public childchangeVisibility(): void {
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
      return `The ${fieldName} must be less then ${this.nameMaxLength} symbols!`;
    }

    return null;
  }
}
