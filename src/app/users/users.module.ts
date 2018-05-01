import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';

import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { UsersRoutingModule } from './routing/users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
  ],
})
export class UsersModule { }
