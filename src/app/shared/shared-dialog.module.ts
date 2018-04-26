import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  imports: [
    MatDialogModule,
  ],
  exports: [
    MatDialogModule,
  ],
})
export class SharedDialogModule { }
