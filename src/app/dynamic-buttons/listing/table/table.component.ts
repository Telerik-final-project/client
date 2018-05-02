import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DynamicButtonsService } from '../../../core/dynamic.buttons.service';
import { IElements } from '../../_interfaces/listing.interface';

@Component({
  selector: 'table-listing',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  public displayedColumns = ['id', 'name', 'targetUrl', 'iconUrl', 'date', 'type', 'links'];

  @Input()
  public dataSource;
  @Input()
  public paginatedButtons: number;

  @ViewChild(MatPaginator) public paginator: MatPaginator;
  @ViewChild(MatSort) public sort: MatSort;

  constructor() { }

  public ngOnInit(): void { }
}
