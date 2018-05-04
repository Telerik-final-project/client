import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SharedIconModule } from './../shared/material/shared-icon.module';

@NgModule({
  imports: [CommonModule, SharedIconModule, SharedModule],
  declarations: [],
  exports: [],
})
export class HomeModule {}
