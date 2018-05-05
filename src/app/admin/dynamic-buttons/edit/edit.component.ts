import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { IDynamicButtonsForm } from '../_interfaces/create.edit.interface';

import { Subscription } from 'rxjs/Subscription';
import { DynamicButtonsService } from '../../../core/dynamic.buttons.service';
import { IDynamicButtons } from '../../../models/dynamic.buttons.interface';

import { icons } from './../../../shared/material/shared-icon-names.module';
import { MatSnackBarConfig } from '@angular/material';
import { SharedSnackModule } from '../../../shared/material/shared-snack.module';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit, IDynamicButtonsForm {
  public form: FormGroup;
  public name: AbstractControl;
  public targetUrl: AbstractControl;
  public iconUrl: AbstractControl;
  public dropdown: AbstractControl;
  public hidden: AbstractControl;

  public isHidden: boolean = false;
  public dropdownValues: { id: string; selected: boolean; value: string }[] = [
    { id: 'mat-option-0', selected: true, value: 'Social Link' },
    { id: 'mat-option-1', selected: false, value: 'Action Link' },
  ];

  public selectedIcon: string;
  public icons = icons;

  public minLength: number = 3;
  public maxLength: number = 128;

  public selected: string = 'Social Link';

  public nameVal: string;
  public targetUrlVal: string;
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
    private buttonsService: DynamicButtonsService,
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.editID = param.id;
    });

    this.buttonsService
      .getInfoPerID(this.editID, { observe: 'response', responseType: 'json' })
      .subscribe((params: Params) => {

        this.nameVal = params.body.buttonInfoToDisplay.name;
        this.targetUrlVal = params.body.buttonInfoToDisplay.target;
      });

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

  public edit(): void {
    const newButton: IDynamicButtons = {
      name: this.form.value.name,
      target: this.form.value.targetUrl,
      link: this.form.value.iconUrl,
      type: this.selected,
      isHidden: this.isHidden,
      isDeleted: 0,
    };

    this.buttonsService
      .edit(this.editID, newButton)
      .subscribe(
        (params: Params) => {
          console.log(params);
          this.router.navigateByUrl('/admin/btn');
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
      return `The ${fieldName} must be less then ${this.maxLength} symbols!`;
    }

    return null;
  }
}
