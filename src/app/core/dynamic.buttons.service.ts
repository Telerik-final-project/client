import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IElements } from '../admin/dynamic-buttons/_interfaces/listing.interface';
import { AppConfig } from '../config/app.config';
import { IDynamicButtons } from '../models/dynamic.buttons.interface';
import { HttpOptions } from '../models/http-options';

@Injectable()
export class DynamicButtonsService {
    constructor(private appConfig: AppConfig, private httpClient: HttpClient) { }

    public getAll(options?: HttpOptions): Observable<{ body: IElements[] }> {
        return this.httpClient.get<{ body: IElements[] }>(`${this.appConfig.apiUrl}/admin/buttons`, options);
    }

    public getInfoPerID(id: number, options?: HttpOptions): Observable<IDynamicButtons> {
        return this.httpClient.get<IDynamicButtons>(`${this.appConfig.apiUrl}/admin/buttons/edit/${id}`, options);
    }

    public create(newButton: IDynamicButtons, options?: HttpOptions): Observable<object> {
        return this.httpClient.post(`${this.appConfig.apiUrl}/admin/buttons/create`, newButton, options);
    }

    public edit(id: number, newButton: IDynamicButtons, options?: HttpOptions): Observable<object> {
        const customOptions = {
            headers: { 'Content-Type': ['application/json'] },
        };

        return this.httpClient.post(`${this.appConfig.apiUrl}/admin/buttons/edit/${id}`, newButton);
    }

    public delete(id: number, options?: HttpOptions): Observable<object> {
        return this.httpClient.post(`${this.appConfig.apiUrl}/admin/buttons/delete/${id}`, { id }, options);
    }
}
