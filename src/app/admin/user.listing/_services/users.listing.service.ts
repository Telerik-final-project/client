import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AppConfig } from '../../../config/app.config';
import { HttpOptions } from '../../../models/http-options';
import { IUsersListing } from '../listing/_interfaces/listing.interface';

@Injectable()
export class UsersListingService {
    constructor(private appConfig: AppConfig, private httpClient: HttpClient) { }

    public getAll(options?: HttpOptions): Observable<{ body: IUsersListing[] }> {
        return this.httpClient.get<{ body: IUsersListing[] }>(`${this.appConfig.apiUrl}/admin/users`, options);
    }
}
