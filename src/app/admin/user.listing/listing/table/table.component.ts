import { HttpHeaders } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsersListingService } from '../../_services/users.listing.service';
import { IUsersTable } from './_interfaces/table.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  public ELEMENT_DATA: IUsersTable[] = [];
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

        this.dataSource.data = x.body.users;
        this.paginatedButtons = this.dataSource.data.length;

        window.setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        });
      });
  }
}
