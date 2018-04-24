import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JobsService } from './jobs.service';
import { AppConfig } from '../config/app.config';
import { AuthService } from './auth.service';

@NgModule({
  providers: [
    JobsService,
    AppConfig,
    AuthService
  ],
})
export class CoreModule { }
