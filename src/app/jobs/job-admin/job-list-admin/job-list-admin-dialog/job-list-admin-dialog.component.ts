import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-job-list-admin-dialog',
  templateUrl: './job-list-admin-dialog.component.html',
  styleUrls: ['./job-list-admin-dialog.component.css'],
})
export class JobListAdminDialogComponent {

  constructor(private dialogRef: MatDialogRef<JobListAdminDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { }

  private onNoClick(): void {
    this.dialogRef.close(false);
  }

  private onDelete(): void {
    this.dialogRef.close(true);
  }

  private onCancel(): void {
    this.dialogRef.close(false);
  }
}
