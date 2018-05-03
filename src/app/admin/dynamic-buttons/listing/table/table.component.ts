import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  constructor(
    private buttonsService: DynamicButtonsService,
    private router: Router,
    private snack: SharedSnackModule,
  ) { }

  // tslint:disable-next-line:no-empty
  public ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.rawDataSource);к
    this.loadDBInfo();
  }

  public ngAfterViewInit(): void {
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

        this.paginatedButtons = this.ELEMENT_DATA.length;

        if (this.paginatedButtons === 0) {
          this.snack.openSnackMsg('No data available!', 'Close', {
            duration: 2500,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        }

        this.dataSource.paginator = this.paginator;
      });
  }
}
