import { CommonModule } from '@angular/common';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { DateAdapter } from '@angular/material';

import { AdminAuthGuard } from './guards/admin-guard.service';
import { ApplicationGuard } from './guards/application-guard.service';
import { AuthGuard } from './guards/auth-guard.service';
import { ClosedApplicationGuard } from './guards/closed-application-guard.service';

import { AppConfig } from '../config/app.config';

import { ApplicationsService } from './applications.service';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { DynamicButtonsService } from './dynamic.buttons.service';
import { AuthDisabledGuard } from './guards/auth-disabled-guard.sercice';
import { JobTypesService } from './job-types.service';
import { JobsService } from './jobs.service';

@NgModule({
  providers: [
    AppConfig,
    AuthGuard,
    AdminAuthGuard,
    ApplicationGuard,
    AuthDisabledGuard,
    ClosedApplicationGuard,
    JobsService,
    DynamicButtonsService,
    ApplicationsService,
    JobTypesService,
    AuthService,
    ConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ConfigService) => () => config.load(),
      deps: [ConfigService],
      multi: true,
    },
  ],
})
export class CoreModule { }
