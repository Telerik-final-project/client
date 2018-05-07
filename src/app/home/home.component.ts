import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { ConfigService } from '../core/config.service';
import { DynamicButtonsService } from './../core/dynamic.buttons.service';
import { IDynamicButtons } from './../models/dynamic.buttons.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './video.css'],
})
export class HomeComponent implements OnInit {
  public textFirst: string;
  public textSecond: string;
  public backgroundImg: string;
  public socialPage: string;
  public actionButtons: IDynamicButtons[] = [];
  public socialButtons: IDynamicButtons[] = [];
  constructor(
    private configService: ConfigService,
    private btnService: DynamicButtonsService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
  ) { }

  public onRedirect(link: string): void {
    window.location.href = link;
  }

  public getSocialUrl(): SafeUrl {
    const sanitizedUrl = this.sanitizer
      .bypassSecurityTrustResourceUrl(`https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2F${this.socialPage}&
      tabs=timeline%2C%20event&width=340&height=500&s
      mall_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=228863411217407`);
    return sanitizedUrl;
  }
  public ngOnInit(): void {
    this.textFirst = this.configService.getEnv('textFirst');
    this.textSecond = this.configService.getEnv('textSecond');
    this.backgroundImg = this.configService.getEnv('backgroundImg');
    this.socialPage = this.configService.getEnv('social');

    this.route.data.subscribe((data) => {
      data.buttons.forEach((button: IDynamicButtons) => {
        if (button.type === 'Action Link') {
          this.actionButtons.push(button);
        } else if (button.type === 'Social Link') {
          this.socialButtons.push(button);
        }
      });
    });
  }
}
