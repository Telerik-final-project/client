import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContactsService } from '../core/contacts.service';
import { SharedModule } from '../shared/shared.module';
import { CreateComponent } from './create/create.component';
import { ContactsRoutingModule } from './routing/contacts.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedModule,
  ],
  declarations: [
    CreateComponent,
  ],
  exports: [],
  providers: [ContactsService],
})
export class ContactsModule { }
