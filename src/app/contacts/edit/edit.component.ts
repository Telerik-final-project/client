import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarConfig } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { ContactsService } from '../../core/contacts.service';
import { SharedSnackModule } from '../../shared/material/shared-snack.module';
import { IContact } from '../_interfaces/contact.interface';
import { IContactForm } from '../_interfaces/create-edit-form.interface';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, IContactForm {
  public form: FormGroup;
  public name: AbstractControl;
  public address: AbstractControl;
  public isNotMapAddess: AbstractControl;

  public minLength: number = 2;
  public nameMaxLength: number = 128;
  public addressMaxLength: number = 1024;

  public isHidden: boolean;
  public nameVal: string;
  public addressVal: string;
  private editID: number;

  private snackOptions = {
    duration: 3700,
    verticalPosition: 'top',
    horizontalPosition: 'center',
  } as MatSnackBarConfig;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snack: SharedSnackModule,
    private formBuilder: FormBuilder,
    private contactsService: ContactsService,
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.editID = param.id;
    });

    this.contactsService
      .getInfoPerID(this.editID, { observe: 'response', responseType: 'json' })
      .subscribe((params: Params) => {
        this.nameVal = params.body.contactInfoToDisplay.name;
        this.addressVal = params.body.contactInfoToDisplay.address;
      });

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
      isNotMapAddess: [''],
    });

    this.name = this.form.get('name');
    this.address = this.form.get('address');
    this.isNotMapAddess = this.form.get('isNotMapAddess');
  }

  public edit(): void {
    const newContact: IContact = {
      name: this.form.value.name,
      address: this.form.value.address,
      status: this.form.value.isNotMapAddess ? 0 : 1,
    };

    this.contactsService
      .edit(this.editID, newContact)
      .subscribe(
        (params: Params) => {
          this.router.navigateByUrl('/admin/contacts');
        },
        (err: HttpErrorResponse) => {
          if (err.error.msd) {
            this.snack.openSnackMsg(
              'Server cannot responde!',
              'Close',
              this.snackOptions,
            );
          }
        },
    );
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
      const errFieldMaxLength = (fieldName === 'address') ? this.addressMaxLength : this.nameMaxLength;

      return `The ${fieldName} must be less then ${errFieldMaxLength} symbols!`;
    }

    return null;
  }
}
