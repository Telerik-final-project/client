import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ContactsService } from '../core/contacts.service';

import { SharedModule } from '../shared/shared.module';
import { ContactsRoutingModule } from './routing/contacts.routing.module';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListingComponent } from './listing/listing.component';
import { TableComponent } from './listing/table/table.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContactsRoutingModule,
  ],
  declarations: [
    ListingComponent,
    CreateComponent,
    TableComponent,
    EditComponent,
  ],
  exports: [],
  providers: [ContactsService],
})
export class ContactsModule { }
