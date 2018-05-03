import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FilterComponent } from '../_shared/filter/filter.component';
import { UsersListingService } from './_services/users.listing.service';
import { ListingComponent } from './listing/listing.component';
import { TableComponent } from './listing/table/table.component';
import { UsersListingRoutingModule } from './routing/user.listing.routing.module';

@NgModule({
  imports: [
    CommonModule,
    UsersListingRoutingModule,
    SharedModule,
  ],
  declarations: [
    ListingComponent,
    TableComponent,
    FilterComponent,
  ],
  exports: [],
  providers: [UsersListingService],
})
export class UserListingModule { }
