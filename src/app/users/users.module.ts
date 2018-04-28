import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { RegisterModule } from '../users/register/register.module';
import { LoginModule } from './login/login.module';
import { LoginRoutingModule } from './login/routing/login-routing.module';
import { RegisterRoutingModule } from './register/routing/register-routing.module';
import { UsersRoutingModule } from './routing/users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    LoginRoutingModule,
    RegisterRoutingModule,
    SharedModule,
    RegisterModule,
    LoginModule,
  ],
  declarations: [],
  exports: [
    RegisterModule,
    LoginModule,
  ],
})
export class UsersModule { }
