import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UsersListingService } from '../user.listing/_services/users.listing.service';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListingComponent } from './listing/listing.component';
import { TableComponent } from './listing/table/table.component';
import { DynamicButtonsRoutingModule } from './routing/dynamic-buttons-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DynamicButtonsRoutingModule,
    SharedModule,
  ],
  declarations: [CreateComponent, EditComponent, ListingComponent, TableComponent],
  exports: [],
  providers: [
    UsersListingService,
  ],
})
export class DynamicButtonsModule { }
