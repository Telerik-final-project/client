import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AppConfig } from './../config/app.config';
import { HttpOptions } from './../models/http-options';
import { IJobAd } from './../models/job-ad';

@Injectable()
export class JobsService {
    private currentJob: IJobAd;

    constructor(private appConfig: AppConfig, private httpClient: HttpClient) {}

    public setCurrentJob(job: IJobAd): void {
        this.currentJob = job;
    }

    public getCurrentJob(): IJobAd {
        return this.currentJob;
    }

    public getAll(): Observable<IJobAd[]> {
        return this.httpClient.get(`${this.appConfig.apiUrl}/jobs`).pipe(map((x) => x as IJobAd[]));
    }

    public getById(id: number): Observable<IJobAd> {
        return this.httpClient.get<IJobAd>(`${this.appConfig.apiUrl}/jobs/${id}`);
    }

    public create(application: IJobAd, options?: HttpOptions): Observable<object> {
        return this.httpClient.post(`${this.appConfig.apiUrl}/jobs`, application, options);
    }
}
