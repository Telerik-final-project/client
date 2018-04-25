import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { AuthRoutingModule } from './routing/auth-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
  ]
})
export class AuthModule { }
