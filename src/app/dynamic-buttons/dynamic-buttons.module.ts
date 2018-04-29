import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { CreateModule } from './create/create.module';
import { CreateRoutingModule } from './create/routing/create-routing.module';
import { DynamicButtonsRoutingModule } from './routing/dynamic-buttons-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CreateRoutingModule,
    DynamicButtonsRoutingModule,
    CreateModule,
    SharedModule,
  ],
  declarations: [],
  exports: [
    CreateModule,
  ],
})
export class DynamicButtonsModule { }
