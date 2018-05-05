import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBarConfig, MatSort, MatTableDataSource, MatDialog, MatDialogRef } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventEmitter } from 'events';

import { SharedSnackModule } from '../../../../shared/material/shared-snack.module';

import { IElements } from '../../_interfaces/listing.interface';

import { DynamicButtonsService } from '../../../../core/dynamic.buttons.service';
import { DialogComponent } from './dialog/dialog.component';
import { ComponentType } from '@angular/core/src/render3';
import { IButton } from 'selenium-webdriver';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'table-listing',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  public displayedColumns = [
    'id',
    'name',
    'targetUrl',
    'iconUrl',
    'date',
    'type',
    'edit',
    'delete',
  ];

  public ELEMENT_DATA: IElements[] = [];
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
    private buttonsService: DynamicButtonsService,
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
    this.openDialog(DialogComponent).subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.buttonsService.delete(id, { responseType: 'json', observe: 'response' })
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
                    .navigateByUrl('/admin/btn');
                });
            },
        );
      }
    });
  }

  private loadDBInfo(): void {
    this.buttonsService
      .getAll({ observe: 'response', responseType: 'json' })
      .subscribe((x) => {
        x.body.buttons.forEach((btn) => {
          this.ELEMENT_DATA.push({
            id: btn.id,
            name: btn.name,
            targetUrl: btn.target,
            iconUrl: btn.link,
            date: btn.createdAt,
            edit: 'edit',
            delete: 'delete',
            type: btn.type,
          });
        });

        this.paginatedButtons = x.body.buttons.length;

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

  private openDialog(component: any, buttonData?: IElements): Observable<any> {
    let dialogRef: MatDialogRef<Component>;

    if (buttonData) {
      const dataToSend = {
        id: buttonData.id,
        name: buttonData.name,
        targetUrl: buttonData.targetUrl,
        iconUrl: buttonData.iconUrl,
        date: buttonData.date,
        edit: buttonData.edit,
        delete: buttonData.delete,
        type: buttonData.type,
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
