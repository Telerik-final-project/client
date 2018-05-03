import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FilterComponent } from '../_shared/filter/filter.component';
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
  declarations: [
    CreateComponent,
    EditComponent,
    ListingComponent,
    TableComponent,
    FilterComponent,
  ],
  exports: [],
})
export class DynamicButtonsModule { }
