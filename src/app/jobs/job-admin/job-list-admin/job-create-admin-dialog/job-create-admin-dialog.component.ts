import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { JobTypesService } from './../../../../core/job-types.service';
import { JobsService } from './../../../../core/jobs.service';
import { JobAd } from './../../../../models/job-ad';
import { JobType } from './../../../../models/job-type';

@Component({
  selector: 'app-job-create-admin-dialog',
  templateUrl: './job-create-admin-dialog.component.html',
  styleUrls: ['./job-create-admin-dialog.component.css'],
})
export class JobCreateAdminDialogComponent implements OnInit {
  private form: FormGroup;
  private title: AbstractControl;
  private jobType: AbstractControl;
  private status: AbstractControl;
  private description: AbstractControl;
  private minTitleName = 4;
  private maxTitleName = 256;
  private maxDescriptionLength = 16384;
  private jobTypes: JobType[];
  private selectedType: JobType;
  private descriptionLength = 0;
  private statusOk = 200;

  constructor(
    private jobTypeService: JobTypesService, private jobsService: JobsService,
    private dialogRef: MatDialogRef<JobCreateAdminDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: JobAd, private elRef: ElementRef, private router: Router) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.minLength(this.minTitleName), Validators.maxLength(this.maxTitleName), Validators.required,
      ]),
      jobType: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required, Validators.minLength(this.minTitleName), Validators.maxLength(this.maxDescriptionLength)]),
      status: new FormControl('', [Validators.required]),
    });

    this.jobTypeService.getAll().subscribe((types) => {
      this.jobTypes = types;
    });

    this.title = this.form.get('title');
    this.jobType = this.form.get('jobType');
    this.status = this.form.get('status');
    this.description = this.form.get('description');

    if (this.data) {
      /* tslint:disable */
      this.form.controls['title'].setValue(this.data.title);
      this.form.controls['jobType'].setValue(this.data.type_id);
      this.form.controls['status'].setValue(this.data.status);
      this.form.controls['description'].setValue(this.data.description);
      /* tslint:enable */
    }
  }

  private getErrorMessage(field: AbstractControl): string {
    if (field.hasError('minlength')) {
      return 'Too short value';
    } else if (field.hasError('required')) {
      return 'You must enter a value';
    } else if (field.hasError('maxlength')) {
      return 'Too long value';
    }
  }

  // private getDescriptionErrorMessage(): string {
  //   const value = this.getDescriptionRealLen();
  //   if (value === 0) {
  //     return 'You must enter a value';
  //   } else if (value < this.minTitleName) {
  //     return 'Too short value';
  //   }
  // }
  private onNoClick(): void {
    this.dialogRef.close(false);
  }

  private onOkay(res: JobAd): void {
    console.log('sssssssssssss');
    this.dialogRef.close(res);
  }

  private onSubmit(): void {
    if (this.data) {
      const updatedAd = {
        id: this.data.id,
        title: this.title.value,
        description: this.description.value,
        descriptionUrl: this.data.descriptionUrl,
        type_id: this.jobType.value,
        status: this.status.value,
        isDeleted: 0,
      };

      this.jobsService.update(updatedAd as JobAd, { observe: 'response', responseType: 'json', headers: new HttpHeaders({
        'Content-Type':  'application/json'}) }).subscribe((x: HttpResponse<object>) => {
          if (x.status === this.statusOk) {
            this.onOkay(x.body as JobAd);
          }
        });
    } else {
      const newAd = {
        title: this.title.value,
        description: this.description.value,
        type_id: this.jobType.value,
        status: this.status.value,
        isDeleted: 0,
      };

      this.jobsService.create(newAd as JobAd, { observe: 'response', responseType: 'json', headers: new HttpHeaders({
        'Content-Type':  'application/json'}) }).subscribe((x: HttpResponse<object>) => {
        if (x.status === this.statusOk) {
          this.onOkay(x.body as JobAd);
        }
      });
    }
  }

  // private getDescriptionRealLen(): number {
  //   const value: string = this.description.value;
  //   let counter = 0;
  //   if (value.length === 0) {
  //     return 0;
  //   }
  //   value.match(/(<\/*\w>)/g).forEach((el) => {
  //     counter += el.length;
  //   });
  //   this.descriptionLength = value.length - counter;
  //   return this.descriptionLength;
  // }
}
