import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { CreateComponent } from './create.component';
import { CreateRoutingModule } from './routing/create-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CreateRoutingModule,
    SharedModule,
  ],
  declarations: [
    CreateComponent,
  ],
  exports: [
    CreateRoutingModule,
  ],
})
export class CreateModule { }
