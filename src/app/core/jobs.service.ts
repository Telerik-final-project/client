import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AppConfig } from './../config/app.config';
import { HttpOptions } from './../models/http-options';
import { JobAd } from './../models/job-ad';

@Injectable()
export class JobsService {
    private currentJob: JobAd;

    constructor(private appConfig: AppConfig, private httpClient: HttpClient) {}

    public setCurrentJob(job: JobAd): void {
        this.currentJob = job;
    }

    public getCurrentJob(): JobAd {
        return this.currentJob;
    }

    public getAll(): Observable<JobAd[]> {
        return this.httpClient.get(`${this.appConfig.apiUrl}/jobs`).pipe(map((x) => x as JobAd[]));
    }

    public getById(id: number): Observable<JobAd> {
        return this.httpClient.get<JobAd>(`${this.appConfig.apiUrl}/jobs/${id}`);
    }

    public create(application: JobAd, options?: HttpOptions): Observable<object> {
        return this.httpClient.post(`${this.appConfig.apiUrl}/jobs`, application, options);
    }
}
