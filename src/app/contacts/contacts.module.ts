import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ContactsRoutingModule } from '../admin/contacts/routing/contacts.routing.module';
import { ContactsComponent } from './contacts.component';

@NgModule({
  imports: [
    CommonModule,
    ContactsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDV1mce2ePIBN-9BLxhWe5s3UQWE_VZgYg',
    }),
  ],
  declarations: [
    ContactsComponent,
  ],
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ContactsModule { }
