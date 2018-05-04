import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersListingService } from '../../_services/users.listing.service';
import { IUsersListing } from '../_interfaces/listing.interface';

@Component({
  selector: 'table-listing',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['id', 'email', 'createdAt', 'applications'];
  public paginatedButtons: number;
  public ifInfo: boolean = true;

  public ELEMENT_DATA: IUsersListing[] = [];
  public dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  constructor(
    private usersListingService: UsersListingService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.loadDBInfo();
  }

  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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

        this.paginatedButtons = x.body.users.length;
        if (this.paginatedButtons > 0) {
          this.dataSource.data = x.body.users;
          this.ifInfo = true;

          return;
        }

        this.ifInfo = false;
      });
  }
}
