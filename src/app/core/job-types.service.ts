import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { AppConfig } from './../config/app.config';
import { JobType } from './../models/job-type';

@Injectable()
export class JobTypesService {
    private jobTypes: JobType[];

    constructor(private appConfig: AppConfig, private httpClient: HttpClient) {}

    public getAll(): Observable<JobType[]> {
        return this.httpClient.get(`${this.appConfig.apiUrl}/jobs/types`).pipe(map((x) => x as JobType[]));
    }
}
