import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { IDynamicButtons } from '../../models/dynamic.buttons.interface';
import { IDynamicButtonsForm } from '../_interfaces/create.edit.interface';

import { DynamicButtonsService } from '../../core/dynamic.buttons.service';

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
  public dropdownValues: object[] = [
    { id: 'mat-option-0', selected: true, value: 'Social Link' },
    { id: 'mat-option-1', selected: false, value: 'Action Link' },
  ];

  public minLength: number = 3;
  public maxLength: number = 128;

  public selected: string = 'Social Link';

  private editID: number;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private buttonsService: DynamicButtonsService,
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

  public edit(id: number, route: ActivatedRoute): void {
    this.buttonsService
      .getInfoPerID(id, { observe: 'response', responseType: 'json' })
      .subscribe((params: Params) => console.log(params));

    this.editID = this.route.params.id;
    console.log(this.editID);

    const newButton: IDynamicButtons = {
      name: this.form.value.name,
      target: this.form.value.targetUrl,
      link: this.form.value.iconUrl,
      type: this.selected,
      isHidden: this.isHidden,
      isDeleted: 0,
    };

    this.buttonsService
      .edit(this.editID, newButton, { observe: 'response', responseType: 'json' })
      .subscribe((params: Params) => console.log(params));
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
