import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../core/config.service';
import { DynamicButtonsService } from './../core/dynamic.buttons.service';
import { IDynamicButtons } from './../models/dynamic.buttons.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public text: string;
  public backgroundImg: string;
  public actionButtons: IDynamicButtons[] = [];
  public socialButtons: IDynamicButtons[] = [];
  constructor(private configService: ConfigService, private btnService: DynamicButtonsService) {}

  public onRedirect(link: string): void {
    window.location.href = link;
  }
  public ngOnInit(): void {
    this.btnService.getAll().subscribe((res) => {
      res.buttons.forEach((button: IDynamicButtons) => {
        if (button.type === 'Action Link') {
          this.actionButtons.push(button);
        } else if (button.type === 'Social Link') {
          this.socialButtons.push(button);
        }
      });
    });
    this.text = this.configService.getEnv('text');
    this.backgroundImg = this.configService.getEnv('backgroundImg');
  }
}
