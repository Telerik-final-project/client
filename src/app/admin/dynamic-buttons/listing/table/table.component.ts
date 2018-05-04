import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBarConfig, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventEmitter } from 'events';
import { DynamicButtonsService } from '../../../../core/dynamic.buttons.service';
import { SharedSnackModule } from '../../../../shared/material/shared-snack.module';
import { IElements } from '../../_interfaces/listing.interface';

@Component({
  selector: 'table-listing',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  public displayedColumns = ['id', 'name', 'targetUrl', 'iconUrl', 'date', 'type', 'links'];

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
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.loadDBInfo();
  }

  public ngAfterViewInit(): void {
    if (this.paginatedButtons <= 0) {
      return;
    }

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
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
            buttons: ['edit', 'delete'],
            type: btn.type,
          });
        });

        this.paginatedButtons = x.body.buttons.length;

        if (this.paginatedButtons > 0) {
          this.dataSource.data = x.body.buttons;
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
}
