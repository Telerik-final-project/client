import { Component, OnInit } from '@angular/core';
import { IJobAd } from './../../models/job-ad';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
})
export class JobDetailComponent implements OnInit {

  private ad: IJobAd = {
    title: 'DevOps',
    createdAt: '16/03/2018',
    description: `Some very long description here. Some very long descriptio here.
    Some very long description here. Some very long description here.
    fxLayout="row wrap".  fxLayout="row wrap".  fxLayout="row wrap"`,
  };

  constructor() {}

  ngOnInit() {
  }

}
