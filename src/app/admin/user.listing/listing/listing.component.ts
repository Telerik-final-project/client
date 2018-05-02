import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { UsersListingService } from '../_services/users.listing.service';
import { IUsersListing } from './_interfaces/listing.interface';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent implements OnInit {
  public ELEMENT_DATA: IUsersListing[] = [];
  public dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  public paginatedButtons: number;

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  constructor(
    private usersListingService: UsersListingService,
    private router: Router,
  ) { }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    this.loadDBInfo();
  }

  public applyFilter(filterValue: string): void {
    const newFilteredValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = newFilteredValue;
  }

  private loadDBInfo(): void {
    this.usersListingService
      .getAll({ observe: 'response', responseType: 'json' })
      .subscribe((x) => {
        x.body.users.forEach((user) => {
          this.ELEMENT_DATA.push({
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            applications: user.applications,
          });
        });
      });

    console.log(this.dataSource);
    this.paginatedButtons = this.ELEMENT_DATA.length;

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
