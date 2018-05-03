import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, SimpleSnackBar } from '@angular/material';

@NgModule({
  imports: [],
  exports: [],
})
export class SharedSnackModule {
  constructor(private matSnackBar: MatSnackBar) { }

  public openSnackMsg(msg: string, action?: string, options?: MatSnackBarConfig): MatSnackBarRef<SimpleSnackBar> {
    return this.matSnackBar.open(msg, action, options);
  }

  public dismissSnackMsg(): void {
    this.matSnackBar.dismiss();
  }
}
