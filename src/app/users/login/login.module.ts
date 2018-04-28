import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './routing/login-routing.module';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginRoutingModule,
  ],
})
export class LoginModule { }
