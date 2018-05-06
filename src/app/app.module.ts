import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfig } from './config/app.config';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './home/home.component';
import { JobsModule } from './jobs/jobs.module';
import { NavbarModule } from './navbar/navbar.module';
import { SharedSnackModule } from './shared/material/shared-snack.module';
import { SharedModule } from './shared/shared.module';

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
  ],
  imports: [
    BrowserModule,
    SharedModule,
    SharedSnackModule,
    AppRoutingModule,
    CoreModule,
    NavbarModule,
    HttpClientModule,
    JobsModule,
    BrowserAnimationsModule,
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
