import { HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UsersListingService } from '../_services/users.listing.service';
import { IUsersListing } from './_interfaces/listing.interface';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListingComponent implements OnInit {


  constructor() { }

  public ngOnInit(): void { }

  // public applyFilter(filterValue: string): void {
  //   const newFilteredValue = filterValue.trim().toLowerCase();
  //   this.dataSource.filter = newFilteredValue;
  // }
}
