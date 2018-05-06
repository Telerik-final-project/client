import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContactsService } from '../core/contacts.service';

import { SharedModule } from '../shared/shared.module';
import { ContactsRoutingModule } from './routing/contacts.routing.module';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedModule,
  ],
  declarations: [
    CreateComponent,
    EditComponent,
  ],
  exports: [],
  providers: [ContactsService],
})
export class ContactsModule { }
