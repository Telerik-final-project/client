import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ContactsService } from '../../../core/contacts.service';

import { IContact } from '../_interfaces/contact.interface';
import { IContactForm } from '../_interfaces/create-edit-form.interface';

import { MatSnackBarConfig } from '@angular/material';
import { SharedSnackModule } from '../../../shared/material/shared-snack.module';
import { icons } from './../../../shared/material/shared-icon-names.module';

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
  public longtitude: AbstractControl;
  public latitude: AbstractControl;

  public isHidden: boolean = true;

  public minLength: number = 2;
  public nameMaxLength: number = 128;
  public addressMaxLength: number = 1024;

  private snackOptions = {
    duration: 4500,
    verticalPosition: 'top',
    horizontalPosition: 'center',
  } as MatSnackBarConfig;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private snack: SharedSnackModule,
    private contactsService: ContactsService,
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
      longtitude: [''],
      latitude: [''],
    });

    this.name = this.form.get('name');
    this.address = this.form.get('address');
    this.isMapAddess = this.form.get('isMapAddess');
    this.longtitude = this.form.get('longtitude');
    this.latitude = this.form.get('latitude');
  }

  public create(): void {
    const newConatct: IContact = {
      name: this.form.value.name,
      address: this.form.value.address,
      status: this.form.value.isMapAddess || 0,
    };

    if (!this.isHidden  ) {
      newConatct.longtitude = this.form.value.longtitude || 0;
      newConatct.latitude = this.form.value.latitude || 0;

      if ((newConatct.latitude === 0 || newConatct.longtitude === 0)) {
        this.snack.openSnackMsg(
          'Longtitude or latitude fields cannot be empty!',
          'Close',
          this.snackOptions,
        );
        return;
      }
    }

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
      return `The ${fieldName} field is required!`;
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
