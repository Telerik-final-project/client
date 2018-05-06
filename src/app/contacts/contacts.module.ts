import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import { ContactsService } from '../core/contacts.service';

import { SharedModule } from '../shared/shared.module';
import { ContactsRoutingModule } from './routing/contacts.routing.module';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListingComponent } from './listing/listing.component';
import { DialogComponent } from './listing/table/dialog/dialog.component';
import { TableComponent } from './listing/table/table.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    ContactsRoutingModule,
  ],
  declarations: [
    ListingComponent,
    CreateComponent,
    DialogComponent,
    TableComponent,
    EditComponent,
  ],
  entryComponents: [
    DialogComponent,
  ],
  exports: [],
  providers: [ContactsService],
})
export class ContactsModule { }
