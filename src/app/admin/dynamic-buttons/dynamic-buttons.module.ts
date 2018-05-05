import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material';

import { SharedModule } from '../../shared/shared.module';
import { DynamicButtonsRoutingModule } from './routing/dynamic-buttons-routing.module';

import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListingComponent } from './listing/listing.component';
import { DialogComponent } from './listing/table/dialog/dialog.component';
import { TableComponent } from './listing/table/table.component';

import { UsersListingService } from '../user.listing/_services/users.listing.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    DynamicButtonsRoutingModule,
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
  providers: [
    UsersListingService,
  ],
})
export class DynamicButtonsModule { }
