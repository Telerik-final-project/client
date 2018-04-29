import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { JobTypesService } from './../../../core/job-types.service';
import { JobType } from './../../../models/job-type';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css'],
})
export class JobCreateComponent implements OnInit {
  private form: FormGroup;
  private title: AbstractControl;
  private jobType: AbstractControl;
  private status: AbstractControl;
  private minTitleName = 4;
  private maxTitleName = 256;
  private maxDescriptionLength = 16384;
  private jobTypes: JobType[];
  private selectedType: JobType;
  constructor(private jobTypeService: JobTypesService) { }

  public ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.minLength(this.minTitleName), Validators.maxLength(this.maxTitleName), Validators.required]),
      jobType: new FormControl('', [Validators.required]),
      description: new FormControl('', Validators.required),
      status: new FormControl('', [Validators.required]),
    });

    this.jobTypeService.getAll().subscribe((types) => {
      this.jobTypes = types;
    });

    this.title = this.form.get('title');
    this.jobType = this.form.get('jobType');
    this.status = this.form.get('status');
  }

  private getErrorMessage(field: AbstractControl): string {
    if (field.hasError('minlength')) {
      return 'Too short title';
    } else if (field.hasError('required')) {
      return 'You must enter a value';
    } else if (field.hasError('maxlength')) {
      return 'Too long title';
    }
  }

}
