import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ConfigService {
  private config: Object = null;
  constructor(private httpClient: HttpClient) {}

  public getEnv(key: any): object {
    return this.config[key];
  }

  public load(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpClient
        .get(`http://localhost:3012/test/env.json`)
        .catch((error: any): any => {
          console.log('Configuration file "env.json" could not be read');
          resolve(true);
          return Observable.throw(error.json().error || 'Server error');
        })
        .subscribe((res) => {
          this.config = res;
          resolve(true);
        });
    });
  }
}
