import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { NavbarModule } from './navbar/navbar.module';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';

import { AppConfig } from './config/app.config';

import { JobApplicationComponent } from './jobs/job-application/job-application.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { JobListComponent } from './jobs/job-list.component';
import { JobViewComponent } from './jobs/job-view.component';
import { JobsModule } from './jobs/jobs.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    CoreModule,
    NavbarModule,
    HttpClientModule,
    JobsModule
  ],
  providers: [AppConfig],
  bootstrap: [AppComponent],
})
export class AppModule { }
