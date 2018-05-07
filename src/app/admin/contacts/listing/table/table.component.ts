import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ComponentType } from '@angular/core/src/render3';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatPaginator, MatSnackBarConfig, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs/Observable';

import { ContactsService } from '../../../../core/contacts.service';
import { SharedSnackModule } from '../../../../shared/material/shared-snack.module';
import { DialogComponent } from './dialog/dialog.component';

import { IContact } from '../../_interfaces/contact.interface';
import { IListing } from '../../_interfaces/listing.interface';

@Component({
  selector: 'table-listing-contacts',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  public displayedColumns = [
    'id',
    'name',
    'address',
    'status',
    'edit',
    'delete',
  ];

  public ELEMENT_DATA: any = [];
  public dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  public paginatedButtons: number;
  public ifInfo: boolean = true;

  @Output() public dataToFilter = new EventEmitter();

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  private snackOptions = {
    duration: 3700,
    verticalPosition: 'top',
    horizontalPosition: 'center',
  } as MatSnackBarConfig;

  constructor(
    private contactsService: ContactsService,
    private snack: SharedSnackModule,
    private dialog: MatDialog,
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

  public delete(id: number): void {
    this.openDialog(DialogComponent).subscribe((isConfirmed: Component) => {
      if (isConfirmed) {
        this.contactsService.delete(id, { responseType: 'json', observe: 'response' })
          .subscribe(
            (params: Params) => {
              console.log(params);
            },
            (err: HttpErrorResponse) => {
              console.log(err);
            },
            () => {
              this.router
                .navigateByUrl('/home')
                .then((val) => {
                  this.router
                    .navigateByUrl('/admin/contacts');
                });
            },
        );
      }
    });
  }

  private loadDBInfo(): void {
    this.contactsService
      .getAll({ observe: 'response', responseType: 'json' })
      .subscribe((x) => {
        x.forEach((contact, i) => {
          this.ELEMENT_DATA.push({
            id: contact.id,
            name: contact.name,
            address: contact.address,
            status: contact.status ? 'Yes' : 'No',
            createdAt: contact.createdAt,
            edit: 'edit',
            delete: 'delete',
          });
        });

        this.paginatedButtons = this.ELEMENT_DATA.length;

        if (this.paginatedButtons > 0) {
          window.setTimeout(() => {
            this.dataSource.paginator = this.paginator;
          });

          this.dataSource.data = this.ELEMENT_DATA;
          this.ifInfo = true;

          return;
        }

        this.snack.openSnackMsg(
          'No buttons to list!',
          'Close',
          this.snackOptions,
        );

        this.ifInfo = false;
      });
  }

  private openDialog(component: any, contactsData?: IListing): Observable<Component> {
    let dialogRef: MatDialogRef<Component>;

    if (contactsData) {
      const dataToSend: IListing = {
        id: contactsData.id,
        name: contactsData.name,
        address: contactsData.address,
        status: contactsData.status,
      };

      dialogRef = this.dialog.open(component, {
        data: dataToSend,
        panelClass: ['admin-dialog'],
        closeOnNavigation: true,
        disableClose: true,
      });
    } else {
      dialogRef = this.dialog.open(component, {
        panelClass: ['admin-dialog'],
        disableClose: true,
      });
    }
    return dialogRef.beforeClose();
  }
}
