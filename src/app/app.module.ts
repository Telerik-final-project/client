import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppConfig } from './config/app.config';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { JobApplicationComponent } from './jobs/job-application/job-application.component';
import { JobListComponent } from './jobs/job-list.component';
import { JobViewComponent } from './jobs/job-view.component';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { JobDetailComponent } from './jobs/job-detail/job-detail.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    JobApplicationComponent,
    JobListComponent,
    JobDetailComponent,
    JobViewComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    SharedModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [AppConfig],
  bootstrap: [AppComponent],
})
export class AppModule { }
