import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './routing/register-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
  ],
  declarations: [
    RegisterComponent,
  ],
  exports: [
    RegisterRoutingModule,
  ],
})
export class RegisterModule { }
