import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JobAd } from '../models/job-ad';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css'],
})
export class JobViewComponent {
  @Input()
  public job: JobAd;

  @Output()
  private showJob = new EventEmitter();

  constructor() {}
}
