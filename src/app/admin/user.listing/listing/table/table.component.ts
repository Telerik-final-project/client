import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBarConfig, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SharedSnackModule } from '../../../../shared/material/shared-snack.module';
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

  private snackOptions = {
    duration: 3700,
    verticalPosition: 'top',
    horizontalPosition: 'center',
  } as MatSnackBarConfig;

  constructor(
    private usersListingService: UsersListingService,
    private snack: SharedSnackModule,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.loadDBInfo();
  }

  public ngAfterViewInit(): void {
    if (this.paginatedButtons <= 0) {
      return;
    }

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
          window.setTimeout(() => {
            this.dataSource.paginator = this.paginator;
          });

          this.ifInfo = true;
          this.dataSource.data = x.body.users;

          return;
        }

        this.snack.openSnackMsg(
          'No users to list!',
          'Close',
          this.snackOptions,
        );

        this.ifInfo = false;
      });
  }
}
