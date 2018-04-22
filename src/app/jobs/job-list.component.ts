import { Component, OnInit } from '@angular/core';
import { IJobAd } from './../models/job-ad';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {
  private ads = Array<IJobAd>();

  constructor() { }

  ngOnInit() {
  }

}
