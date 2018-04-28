import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatSortModule, MatTableModule } from '@angular/material';

@NgModule({
  imports: [
    MatTableModule,
    MatSortModule,
  ],
  exports: [
    MatTableModule,
    MatSortModule,
  ],
})
export class SharedTableModule { }
