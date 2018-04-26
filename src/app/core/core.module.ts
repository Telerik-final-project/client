import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ApplicationGuard } from './guards/application-guard.service';
import { AuthGuard } from './guards/auth-guard.service';
import { ClosedApplicationGuard } from './guards/closed-application-guard.service';

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
    ApplicationGuard,
    AuthGuard,
    ClosedApplicationGuard,
  ],
})
export class CoreModule { }
