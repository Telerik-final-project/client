import { AgmCoreModule } from '@agm/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Params } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';

import { IContact } from '../admin/contacts/_interfaces/contact.interface';
import { IListing } from '../admin/contacts/_interfaces/listing.interface';
import { ContactsService } from '../core/contacts.service';
import { IElements } from '../admin/dynamic-buttons/_interfaces/listing.interface';
// import { MatPaginator } from '@angular/material';
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit, IContact {
  public name: string;
  public address: string;
  public status: number;
  public longtitude?: number;
  public latitude?: number;

  public isMapAddress: boolean = true;
  public isMainAddress: boolean;
  public isMainAddressUsed: boolean = false;

  public contacts: IListing[];

  public primaryAddress: IListing;
  public lat: number = 42.697708;
  public lng: number = 23.321868;

  public paginatedContacts: number;
  public panelOpenState: boolean = false;

  constructor(private contactsService: ContactsService) { }

  public ngAfterViewInit(): void {
    if (this.paginatedContacts <= 0) {
      return;
    }
  }

  public ngOnInit(): void {
    this.contactsService.getAll().subscribe(
      (data: IListing[]) => {
        this.contacts = data;

        this.primaryAddress = this.contacts.find((c) => c.status === !!1);
      },
    );

  }

  public changeMap(longtitude: number, latitude: number): void {
    this.lng = +longtitude;
    this.lat = +latitude;
  }
}
