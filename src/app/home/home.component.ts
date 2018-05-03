import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../core/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private configService: ConfigService) { }

  public ngOnInit(): void {
    console.log(this.configService.getEnv('text'));
  }
}
