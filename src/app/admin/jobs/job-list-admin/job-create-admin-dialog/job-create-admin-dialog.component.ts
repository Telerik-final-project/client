import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBarConfig } from '@angular/material';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { JobApplicationDialogComponent } from '../../../../shared/jobs/job-application/job-application-dialog.component';
import { SharedSnackModule } from '../../../../shared/material/shared-snack.module';
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
  public form: FormGroup;
  public title: AbstractControl;
  public jobType: AbstractControl;
  public status: AbstractControl;
  public description: AbstractControl;
  public selectedType: JobType;
  public descriptionLength = 0;
  public statusOk = 200;
  public editorOptions = {
    charCounterMax: 16384,
    toolbarButtonsXS: [
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'subscript',
      'superscript',
      'align',
      'insertLink',
      '|',
      'undo',
      'redo',
    ],
    toolbarButtonsSM: [
      'fullscreen',
      'bold',
      'italic',
      'underline',
      'strikeThrough',
      'subscript',
      'superscript',
      '|',
      'fontFamily',
      'fontSize',
      'color',
      '|',
      'align',
      'quote',
      '-',
      'insertLink',
      '|',
      'emoticons',
      'specialCharacters',
      'selectAll',
      'html',
      '|',
      'undo',
      'redo',
    ],
    events: {
      'froalaEditor.keyup': (e, editor) => {
        this.descriptionLength = editor.charCounter.count();
      },
    },
  };
  public jobTypes: JobType[];
  private minDescription = 11;
  private minTitleName = 4;
  private maxTitleName = 256;
  private maxDescriptionLength = 16384;
  private snackOptions = {
    duration: 3000,
    verticalPosition: 'top',
    horizontalPosition: 'center',
  } as MatSnackBarConfig;

  constructor(
    private snack: SharedSnackModule,
    private jobTypeService: JobTypesService,
    private jobsService: JobsService,
    private dialogRef: MatDialogRef<JobCreateAdminDialogComponent>,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: JobAd,
    private elRef: ElementRef,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.minLength(this.minTitleName),
        Validators.maxLength(this.maxTitleName),
        Validators.required,
      ]),
      jobType: new FormControl('', [Validators.required]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(this.minDescription),
        Validators.maxLength(this.maxDescriptionLength),
      ]),
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

  private getDescriptionErrorMessage(): string {
    const value = this.descriptionLength;
    if (value === 0) {
      return 'You must enter a value';
    } else if (value < this.minTitleName) {
      return 'Too short value';
    }
  }
  private onNoClick(): void {
    if (
      this.title.value ||
      this.jobType.value ||
      this.status.value ||
      this.description.value
    ) {
      this.openDialog().subscribe((res) => {
        if (res) {
          this.dialogRef.close(false);
        }
      });
    } else {
      this.dialogRef.close(false);
    }
  }

  private onOkay(res: JobAd, type: string): void {
    this.dialogRef.close(res);
    if (type === 'update') {
      this.snack.openSnackMsg(
        'Successfully updated the job ad.',
        'Close',
        this.snackOptions,
      );
    } else {
      this.snack.openSnackMsg(
        'Successfully created a job ad.',
        'Close',
        this.snackOptions,
      );
    }
  }

  private onSubmit(event: any): void {
    event.target.disabled = true;
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

      this.jobsService
        .update(updatedAd as JobAd, {
          observe: 'response',
          responseType: 'json',
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        })
        .subscribe(
          (x: HttpResponse<object>) => {
            this.onOkay(x.body as JobAd, 'update');
          },
          (err) => {
            this.snack.openSnackMsg(
              'We encountered an error during the update.',
              'Close',
              this.snackOptions,
            );
          },
        );
    } else {
      const newAd = {
        title: this.title.value,
        description: this.description.value,
        type_id: this.jobType.value,
        status: this.status.value,
        isDeleted: 0,
      };

      this.jobsService
        .create(newAd as JobAd, {
          observe: 'response',
          responseType: 'json',
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
        })
        .subscribe(
          (x: HttpResponse<object>) => {
            this.onOkay(x.body as JobAd, 'create');
          },
          () => {
            event.target.disabled = false;
            this.snack.openSnackMsg(
              'We encountered an error during the creation.',
              'Close',
              this.snackOptions,
            );
          },
        );
    }
  }

  private openDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(JobApplicationDialogComponent, {});
    return dialogRef.beforeClose();
  }
}
