import { LoginComponent } from './login.component';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './register.component';

import { AuthRoutingModule } from './routing/auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
  ],
})
export class AuthModule { }
