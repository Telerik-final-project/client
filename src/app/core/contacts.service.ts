import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { HttpOptions } from '../models/http-options';

import { IContact } from '../contacts/_interfaces/contact.interface';
import { AppConfig } from './../config/app.config';

@Injectable()
export class ContactsService {
    constructor(
        private appConfig: AppConfig,
        private httpClient: HttpClient,
    ) { }

    public getAll(): Observable<IContact[]> {
        return this.httpClient
            .get(`${this.appConfig.apiUrl}/admin/contacts/create`)
            .pipe(map((x) => x as IContact[]));
    }

    public getInfoPerID(id: number, options?: HttpOptions): any {
        return this.httpClient.get<IContact>(`${this.appConfig.apiUrl}/admin/contacts/edit/${id}`, options);
    }

    public create(newButton: IContact, options?: HttpOptions): Observable<object> {
        return this.httpClient.post(`${this.appConfig.apiUrl}/admin/contacts/create`, newButton, options);
    }

    public edit(id: number, newButton: IContact, options?: HttpOptions): Observable<object> {
        return this.httpClient.post(`${this.appConfig.apiUrl}/admin/contacts/edit/${id}`, newButton);
    }

    public delete(id: number, options?: HttpOptions): Observable<object> {
        return this.httpClient.post(`${this.appConfig.apiUrl}/admin/contacts/delete/${id}`, { id }, options);
    }
}
