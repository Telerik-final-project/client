import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DynamicButtonsService } from '../../core/dynamic.buttons.service';
import { IElements } from '../_interfaces/listing.interface';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent implements OnInit {
  public displayedColumns = ['id', 'name', 'targetUrl', 'iconUrl', 'date', 'type', 'links'];

  public ELEMENT_DATA: IElements[] = [];
  public dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  public paginatedButtons: number;

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  constructor(
    private buttonsService: DynamicButtonsService,
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
    this.buttonsService
      .getAll({ observe: 'response', responseType: 'json' })
      .subscribe((x) => {
        x.body.buttons.forEach((btn) => {
          console.log(btn);
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

        console.log(this.dataSource);
        this.paginatedButtons = this.ELEMENT_DATA.length;

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }
}
