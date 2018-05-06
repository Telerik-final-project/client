import { AgmCoreModule } from '@agm/core';
import { Component, OnInit } from '@angular/core';
import { IContact } from '../admin/contacts/_interfaces/contact.interface';
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

  public lat: number = 51.678418;
  public lng: number = 7.809007;

  constructor() { }

  public ngOnInit() {
  }

}
