import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSnackBarConfig, MatSort, MatTableDataSource } from '@angular/material';
import { Params, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { Observable } from 'rxjs/Observable';

import { SharedSnackModule } from '../../../../shared/material/shared-snack.module';

import { IElements } from '../../_interfaces/listing.interface';

import { DynamicButtonsService } from '../../../../core/dynamic.buttons.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'table-listing',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  public filterValue: string;

  public displayedColumns: string[] = [
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
  public applyFilter(filterValue: string): void {
    this.filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  public delete(id: number): void {
    this.openDialog(DialogComponent).subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {

        const navigateByUrl = (path) => this.router.navigateByUrl(path);

        const refreshBtnsPage = () => navigateByUrl('/home').then(() => navigateByUrl('/admin/btn'));

        this.buttonsService.delete(id, { responseType: 'json', observe: 'response' })
          .subscribe(
            (params: Params) => console.log(params),
            (err: HttpErrorResponse) => console.log(err),
            refreshBtnsPage,
        );
      }
    });
  }

  private loadDBInfo(): void {

    const saveButtonsData = (btn): void => {

      const buttonInfo = {
        id: btn.id,
        name: btn.name,
        targetUrl: btn.target,
        iconUrl: btn.link,
        date: btn.createdAt,
        edit: 'edit',
        delete: 'delete',
        type: btn.type,
      };

      this.ELEMENT_DATA.push(buttonInfo);
    };

    const allButtons = this.buttonsService.getAll({ observe: 'response', responseType: 'json' });

    allButtons.subscribe((recievedData) => {
      recievedData.body.forEach(saveButtonsData);

      this.paginatedButtons = recievedData.body.length;

      if (this.paginatedButtons > 0) {
        window.setTimeout(() => this.dataSource.paginator = this.paginator);

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

      const dialogConfig = {
        data: dataToSend,
        panelClass: ['admin-dialog'],
        closeOnNavigation: true,
        disableClose: true,
      };

      dialogRef = this.dialog.open(component, dialogConfig);

    } else {

      const dialogConfig = {
        panelClass: ['admin-dialog'],
        disableClose: true,
      };

      dialogRef = this.dialog.open(component, dialogConfig);
    }

    return dialogRef.beforeClose();
  }
}
