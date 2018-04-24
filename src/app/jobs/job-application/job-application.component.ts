import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DropzoneConfigInterface  } from 'ngx-dropzone-wrapper';
import { JobsService } from './../../core/jobs.service';
import { IJobAd } from './../../models/job-ad';

@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css'],
})
export class JobApplicationComponent implements OnInit {
  @ViewChild('dzCv') public dropzoneCv;
  public configCv: DropzoneConfigInterface = {
    url: 'http://localhost:3012/api/jobs/upload',
    method: 'POST',
    autoProcessQueue: true,
    acceptedFiles: '.pdf, .doc, .docx',
    maxFilesize: 16,
    dictDefaultMessage: 'Upload your CV',
    maxFiles: 1,
  };
  public configCover: DropzoneConfigInterface = {
    url: 'http://localhost:3012/api/jobs/upload',
    method: 'POST',
    autoProcessQueue: true,
    acceptedFiles: '.pdf, .doc, .docx',
    maxFilesize: 16,
    dictDefaultMessage: 'Upload your Cover letter (optional)',
    maxFiles: 1,
  };

  private minNameLength = 3;
  private maxNameLength = 100;
  private maxCommentLength = 1024;
  private job: IJobAd;
  private jobId: number;
  private form: FormGroup;
  private firstName: AbstractControl;
  private lastName: AbstractControl;
  private comment: AbstractControl;

  constructor(private jobsService: JobsService, private route: ActivatedRoute, private router: Router) { }

  public ngOnInit(): void {
    this.form = new FormGroup({
      firstName: new FormControl(
        '', [
          Validators.required, Validators.minLength(this.minNameLength), Validators.maxLength(this.maxNameLength),
        ],
      ),
      lastName: new FormControl(
        '', [
          Validators.required, Validators.minLength(this.minNameLength), Validators.maxLength(this.maxNameLength),
        ],
      ),
      comment: new FormControl('', [Validators.maxLength(this.maxCommentLength)]),
    });
    this.job = this.jobsService.getCurrentJob();
    if (!this.job) {
      this.route.params.subscribe((params: Params) => {
        console.log(params);
        this.jobId = +params.jobId;
        this.job = this.jobsService.getById(this.jobId);
        this.jobsService.setCurrentJob(this.job);
      });
    }

    this.firstName = this.form.get('firstName');
    this.lastName = this.form.get('lastName');
    this.comment = this.form.get('comment');
  }

  private onSubmit(): void {
    console.log(this.form.get('firstName'));
  }

  private onUploadError(err: any): void {
    err[0].previewElement.firstElementChild.setAttribute('style', 'background: rgba(221, 0, 0, 0.55)');
  }

  private onUploadSuccess(success: any): void {
    success[0].previewElement.firstElementChild.setAttribute('style', 'background:rgba(0, 170, 0, 0.55)');
  }

  private onAdded() {

  }

  private getErrorMessage(field: AbstractControl): string {
    if (field.hasError('minlength')) {
      return 'Too short name';
    } else if (field.hasError('required')) {
      return 'You must enter a name';
    } else if (field.hasError('maxlength')) {
      return 'To short name';
    }
  }
}
