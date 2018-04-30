import { HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DynamicButtonsService } from '../../core/dynamic.buttons.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.css'],
})
export class ListingComponent implements OnInit {
  public displayedColumns = ['id', 'name', 'targetUrl', 'iconUrl', 'date', 'links'];

  public ELEMENT_DATA: IElements[] = [];
  public dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatSort) public sort: MatSort;

  constructor(private buttonsService: DynamicButtonsService) { }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
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
          });
        });

        console.log(this.dataSource);
        this.dataSource.sort = this.sort;
      });
  }
}

export interface IElements {
  id: number;
  name: string;
  targetUrl: number;
  iconUrl: number;
  date: string;
  buttons: string[];
}
