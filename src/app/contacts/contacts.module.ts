import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { ContactsComponent } from './contacts.component';
import { ContactsRoutingModule } from './routing/contacts.routing.module';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ContactsRoutingModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDV1mce2ePIBN-9BLxhWe5s3UQWE_VZgYg',
    }),
  ],
  declarations: [
    ContactsComponent,
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class ContactsModule { }
