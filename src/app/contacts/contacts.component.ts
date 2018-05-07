import { AgmCoreModule } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';

import { IContact } from '../admin/contacts/_interfaces/contact.interface';
import { ContactsService } from '../core/contacts.service';
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
  public contacts: IContact;

  public lat: number = 42.697708;
  public lng: number = 23.321868;

  public panelOpenState: boolean = false;

  constructor(
    private contactsService: ContactsService,
  ) { }

  public ngOnInit(): void {
    this.contactsService.getAll().subscribe(
      (params: Params) => {
        this.contacts = params.contacts;
        console.log(this.contacts);
        this.lat = this.contacts.latitude;
        this.lng = this.contacts.longtitude;
      },
    );
  }

  public changeMap(longtitude: number, latitude: number): void {
    this.lng = +longtitude;
    this.lat = +latitude;
    console.log(this.lng);
  }
}
