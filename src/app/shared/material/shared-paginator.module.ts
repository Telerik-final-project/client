import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatPaginatorModule } from '@angular/material';

@NgModule({
  imports: [
    MatPaginatorModule,
  ],
  exports: [
    MatPaginatorModule,
  ],
})
export class SharedPaginatorModule { }
