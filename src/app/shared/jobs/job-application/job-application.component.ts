import { HttpResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DropzoneConfigInterface  } from 'ngx-dropzone-wrapper';
import { Observable } from 'rxjs/Observable';

import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';

import { JobApplicationDialogComponent } from './job-application-dialog.component';

import { DropzoneCoverConfig } from '../../../config/dropzone-cover.config';
import { DropzoneCvConfig } from '../../../config/dropzone-cv.config';
import { ApplicationsService } from '../../../core/applications.service';
import { AuthService } from '../../../core/auth.service';
import { JobsService } from '../../../core/jobs.service';
import { JobAd } from '../../../models/job-ad';
import { JobApplication } from '../../../models/job-application';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css'],
})
export class JobApplicationComponent implements OnInit {
  public job: JobAd;
  public jobId: number;
  public form: FormGroup;
  public firstName: AbstractControl;
  public lastName: AbstractControl;
  public comment: AbstractControl;
  public cvUrl: string;
  public coverUrl: string;
  @ViewChild('dzCv') public dropzoneCv;

  public configCv =  new DropzoneCvConfig();
  public configCover = new DropzoneCoverConfig();

  public jobApplication: JobApplication;
  private addedSuccessfully = false;
  private minNameLength = 3;
  private maxNameLength = 100;
  private maxCommentLength = 1024;
  private onSuccessDuration = 2000;
  private onErrorDuration = 3000;

  constructor(
    private jobsService: JobsService, private route: ActivatedRoute, private router: Router,
    private authService: AuthService, private applicationsService: ApplicationsService,
    private dialog: MatDialog, private snackMsg: MatSnackBar,
  ) { }

  public ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(
        '', [
          Validators.required, Validators.minLength(this.minNameLength),
          Validators.maxLength(this.maxNameLength), Validators.pattern('[a-zA-Z]+'),
        ],
      ),
      lastName: new FormControl(
        '', [
          Validators.required, Validators.minLength(this.minNameLength),
          Validators.maxLength(this.maxNameLength), Validators.pattern('[a-zA-Z]+'),
        ],
      ),
      comment: new FormControl('', [Validators.maxLength(this.maxCommentLength)]),
    });

    if (!this.job) {
      this.route.params.subscribe((params: Params) => {
        console.log(params);
        this.jobId = +params.jobId;
        this.jobsService.getById(this.jobId).subscribe((data) => {
          this.job = data;
        });
      });
    }

    this.firstName = this.form.get('firstName');
    this.lastName = this.form.get('lastName');
    this.comment = this.form.get('comment');

    console.log(this.authService.decodeToken());
  }

  public openDialog(): Observable<boolean> {
    const dialogRef = this.dialog.open(JobApplicationDialogComponent, {});
    return dialogRef.beforeClose();
  }

  private onSubmit(): void {
    this.jobApplication = {
      firstName: this.form.get('firstName').value,
      lastName: this.form.get('lastName').value,
      comment: this.form.get('comment').value,
      jobOfferId: this.job.id,
      userId: this.authService.decodeToken().sub,
      cvUrl: this.cvUrl,
      coverLetterUrl: this.coverUrl,
    } as JobApplication;

    this.applicationsService
      .create(this.jobApplication, {observe: 'response', responseType: 'json'})
      .subscribe((response: HttpResponse<any>) => {
        if (response.body.errMsg) {
          this.openSnackMsg('Something went wrong with your application!', this.onErrorDuration).afterDismissed().subscribe(() => {
            this.markAsPristine(this.form);
            this.router.navigate(['/']);
          });
        } else {
          this.openSnackMsg('Successfully applied for the job!', this.onSuccessDuration).afterDismissed().subscribe(() => {
            this.markAsPristine(this.form);
            this.router.navigate(['/']);
          });
        }
    });
  }

  private markAsPristine(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control: FormGroup) => {
      control.markAsPristine();

      if (control.controls) {
        (control.controls as any).forEach((c) => {
          this.markAsPristine(c);
        });
      }
    });
  }
  private onUploadError(err: any): void {
    err[0].previewElement.firstElementChild.setAttribute('style', 'background: rgba(221, 0, 0, 0.55)');
  }

  private onUploadSuccess(success: any): void {
    if (success[1].type === 'cv') {
      this.cvUrl = success[1].fileUrl;
    } else {
      this.coverUrl = success[1].fileUrl;
    }

    success[0].previewElement.firstElementChild.setAttribute('style', 'background:rgba(0, 170, 0, 0.55)');
    this.addedSuccessfully = true;
  }

  private openSnackMsg(msg: string, duration: number): MatSnackBarRef<SimpleSnackBar> {
    return this.snackMsg.open(msg, 'Close', {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }

  private getErrorMessage(field: AbstractControl): string {
    if (field.hasError('minlength')) {
      return 'Too short name';
    } else if (field.hasError('required')) {
      return 'You must enter a value';
    } else if (field.hasError('maxlength')) {
      return 'Too long name';
    } else if (field.hasError('pattern')) {
      return 'Not a valid input';
    }
  }

  private canDeactivate(): Observable<boolean> | boolean {
    if (this.form.dirty) {
      return this.openDialog();
    }
    return true;
  }
}
