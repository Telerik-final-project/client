import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IJobAd } from '../models/job-ad';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css'],
})
export class JobViewComponent implements OnInit {
  @Input()
  public job: IJobAd;

  @Output()
  private showJob = new EventEmitter();

  constructor() { }
  public ngOnInit(): void {}

}
