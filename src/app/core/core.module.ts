import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JobsService } from './jobs.service';

@NgModule({
  providers: [
    JobsService,
  ],
})
export class CoreModule { }
