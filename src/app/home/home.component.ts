import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../core/config.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public text: string;
  public backgroundImg: string;
  constructor(private configService: ConfigService) {}

  public ngOnInit(): void {
    this.text = this.configService.getEnv('text');
    this.backgroundImg = this.configService.getEnv('backgroundImg');
  }
}
