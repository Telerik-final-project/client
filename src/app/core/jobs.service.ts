import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AppConfig } from './../config/app.config';
import { IJobAd } from './../models/job-ad';

@Injectable()
export class JobsService {
    private currentJob: IJobAd;
    private jobs: IJobAd[] = [
    {
        id: 1,
        title: 'DevOps - 1',
        createdAt: '16/03/2018',
        description: `Some very long description here. Some very long description here.
            Some very long description here. Some very long description here.
            fxLayout="row wrap".  fxLayout="row wrap".  fxLayout="row wrap"`,
        isDeleted: 0,
        status: 'open',
        category: 'devs',
        updatedAt: '16/03/2018',
    },
    {
        id: 2,
        title: 'DevOps - 2',
        createdAt: '16/03/2018',
        description: `Some very long description here. Some very long description here.
            Some very long description here. Some very long description here.
            fxLayout="row wrap".  fxLayout="row wrap".  fxLayout="row wrap"`,
        isDeleted: 0,
        status: 'open',
        category: 'devs',
        updatedAt: '16/03/2018',
    }];

    constructor(private appConfig: AppConfig, private httpClient: HttpClient) {}

    public setCurrentJob(job: IJobAd): void {
        this.currentJob = job;
    }

    public getCurrentJob(): IJobAd {
        return this.currentJob;
    }

    public getAll(): Observable<IJobAd[]> {
        return this.httpClient.get(`${this.appConfig.apiUrl}/jobs`).pipe(map((x) => x as IJobAd[]));
        // return this.jobs;
    }

    public getById(id: number): Observable<IJobAd> {
        return this.httpClient.get<IJobAd>(`${this.appConfig.apiUrl}/jobs/${id}`);
    }

}
