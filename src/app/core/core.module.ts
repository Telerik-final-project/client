import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppConfig } from '../config/app.config';

import { ApplicationsService } from './applications.service';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { DynamicButtonsService } from './dynamic.buttons.service';
import { JobTypesService } from './job-types.service';
import { JobsService } from './jobs.service';

import { AdminAuthGuard } from './guards/admin-guard.service';
import { ApplicationGuard } from './guards/application-guard.service';
import { AuthDisabledGuard } from './guards/auth-disabled-guard.sercice';
import { AuthGuard } from './guards/auth-guard.service';
import { ClosedApplicationGuard } from './guards/closed-application-guard.service';
import { UserAlreadyAppliedGuard } from './guards/user-already-applied-guard.service';

import { ApplicationsResolver } from './resolvers/applications.resolver';
// import { ButtonsResolver } from './resolvers/buttons.resolver';
import { JobDetailResolver } from './resolvers/job-detail.resolver';
import { JobListResolver } from './resolvers/job-list.resolver';

@NgModule({
  providers: [
    AppConfig,
    AuthGuard,
    AdminAuthGuard,
    ApplicationGuard,
    AuthDisabledGuard,
    ClosedApplicationGuard,
    UserAlreadyAppliedGuard,
    JobsService,
    DynamicButtonsService,
    ApplicationsService,
    JobTypesService,
    AuthService,
    ConfigService,
    JobListResolver,
    ApplicationsResolver,
    JobDetailResolver,
    // ButtonsResolver,
    {
      provide: APP_INITIALIZER,
      useFactory: (config: ConfigService) => () => config.load(),
      deps: [ConfigService],
      multi: true,
    },
  ],
})
export class CoreModule { }
