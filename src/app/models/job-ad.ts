import { JobType } from './job-type';
export class JobAd {
    public id: number;

    public title: string;

    public descriptionUrl: string;

    public category: string;

    public status: string;

    public isDeleted: number;

    public createdAt: string;

    public updatedAt: string;

    public type_id: number;

    public JobType: JobType;

    public _data: string;
}
