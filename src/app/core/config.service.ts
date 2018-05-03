import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ConfigService {
  private config: { text: string; backgroundImg: string; social: string };
  constructor(private httpClient: HttpClient) {}

  public getEnv(key: any): string {
    return this.config[key];
  }

  public load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(`http://localhost:3012/config`)
        .catch((error: any): any => {
          console.log('Configuration file "env.json" could not be read');
          resolve(true);
          return Observable.throw(error.error || 'Server error');
        })
        .subscribe(
          (res: { text: string; backgroundImg: string; social: string }) => {
            this.config = res;
            resolve(true);
          },
        );
    });
  }
}
