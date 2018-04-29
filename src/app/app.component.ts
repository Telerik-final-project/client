import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  constructor(private overlayContainer: OverlayContainer) {}

  public ngOnInit(): void {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    overlayContainerClasses.add('custom-overlay');
  }
}
