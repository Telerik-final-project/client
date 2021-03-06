import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { AppConfig } from './config/app.config';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { ContactsModule } from './admin/contacts/contacts.module';
import { ContactsRoutingModule } from './admin/contacts/routing/contacts.routing.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { JobsModule } from './jobs/jobs.module';
import { NavbarModule } from './navbar/navbar.module';
import { SharedSnackModule } from './shared/material/shared-snack.module';
import { SharedModule } from './shared/shared.module';
import { NotFoundComponent } from './not-found/not-found.component';

export const tokenGetter = () => {
  const token = localStorage.getItem('access_token');
  if (token) {
    return token;
  } else {
    return sessionStorage.getItem('access_token');
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    SharedSnackModule,
    AppRoutingModule,
    ContactsRoutingModule,
    ContactsModule,
    CoreModule,
    NavbarModule,
    HttpClientModule,
    JobsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['localhost:3012'],
        blacklistedRoutes: [],
      },
    }),
  ],
  providers: [AppConfig],
  bootstrap: [AppComponent],
})
export class AppModule { }
