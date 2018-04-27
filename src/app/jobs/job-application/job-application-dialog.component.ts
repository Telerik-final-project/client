import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-job-application-dialog',
  templateUrl: './job-application-dialog.component.html',
  styleUrls: ['./job-application-dialog.component.css'],
})
export class JobApplicationDialogComponent {

  constructor(private dialogRef: MatDialogRef<JobApplicationDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

  private onNoClick(): void {
    this.dialogRef.close(false);
  }

  private closeGoAway(): void {
    this.dialogRef.close(true);
  }

  private closeStay(): void {
    this.dialogRef.close(false);
  }

}
