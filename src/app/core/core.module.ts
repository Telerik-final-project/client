import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppConfig } from '../config/app.config';
import { ApplicationsService } from './applications.service';
import { AuthService } from './auth.service';
import { JobsService } from './jobs.service';

@NgModule({
  providers: [
    JobsService,
    AppConfig,
    AuthService,
    ApplicationsService,
  ],
})
export class CoreModule { }
