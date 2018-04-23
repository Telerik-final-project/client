import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from './../config/app.config';
import { IJobAd } from './../models/job-ad';

@Injectable()
export class JobsService {
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

    constructor(private appConfig: AppConfig) {}

    public getAll(): IJobAd[] {
        return this.jobs;
    }

    public getById(id: number): IJobAd {
        return this.jobs.find((job) => job.id === id);
    }

}
