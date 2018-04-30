import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AppConfig } from '../config/app.config';
import { IDynamicButtons } from '../models/dynamic.buttons.interface';
import { HttpOptions } from '../models/http-options';

@Injectable()
export class DynamicButtonsService {
    constructor(private appConfig: AppConfig, private httpClient: HttpClient) { }

    public create(newButton: IDynamicButtons, options?: HttpOptions): Observable<object> {
        return this.httpClient.post(`${this.appConfig.apiUrl}/admin/buttons/create`, newButton, options);
    }

    public getAll(options?: HttpOptions): any {
        return this.httpClient.get(`${this.appConfig.apiUrl}/admin/buttons`, options);
    }

    public getInfoPerID(id: number, options?: HttpOptions): any {
        return this.httpClient.get(`${this.appConfig.apiUrl}/admin/buttons/edit/${id}`, options);
    }
}
