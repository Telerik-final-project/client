import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { AppConfig } from './../config/app.config';
import { HttpOptions } from './../models/http-options';
import { JobAd } from './../models/job-ad';

@Injectable()
export class JobsService {
  private jobs: JobAd[];

  constructor(private appConfig: AppConfig, private httpClient: HttpClient) {}

  public getAll(): Observable <JobAd[]> {
    return this.httpClient.get(`${this.appConfig.apiUrl}/jobs`).pipe(map((x) => x as JobAd[]));
  }

  public getById(id: number): Observable <JobAd> {
    return this.httpClient.get<JobAd>(`${this.appConfig.apiUrl}/jobs/${id}`);
  }

  public create(job: JobAd, options?: HttpOptions): Observable <object> {
    return this.httpClient.post<JobAd>(`${this.appConfig.apiUrl}/jobs/create`, job, options);
  }

  public update(job: JobAd, options?: HttpOptions): Observable <object> {
    return this.httpClient.post<JobAd>(`${this.appConfig.apiUrl}/jobs/edit`, job, options);
  }

  public delete(id: number, options?: HttpOptions): Observable<object> {
    return this.httpClient.post(`${this.appConfig.apiUrl}/jobs/delete/${id}`, {id}, options);
  }

  public filter(
    jobs: JobAd[], keyword: string = '',
    type: string = '', startDate: string = '01/01/1970', endDate: string = '31/12/9999'): JobAd[] {
      let jobType = type;
      if (jobType === 'none') {
        jobType = '';
      }
      console.log(keyword, jobType, startDate, endDate);
      return jobs.filter((job) => (
        job.descriptionUrl.toLowerCase().includes(keyword.toLowerCase()) ||
          job.title.toLowerCase().includes(keyword.toLowerCase())) && (job.JobType.jobType.includes(jobType) &&
          this.checkForEndDate(endDate, job.createdAt) && this.checkForStartDate(startDate, job.createdAt)));
  }
  private checkForStartDate(start: string, job: string): boolean {
    const beautifed = this.beautifyDate(job, start);

    if (beautifed.filterYear < beautifed.jobYear) {
      return true;
    } else if (beautifed.filterYear === beautifed.jobYear) {
      if (beautifed.filterMonth < beautifed.jobMonth) {
        return true;
      } else if (beautifed.filterMonth === beautifed.jobMonth) {
        if (beautifed.filterDay <= beautifed.jobDay) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  private checkForEndDate(end: string, job: string): boolean {
    const beautifed = this.beautifyDate(job, end);

    if (beautifed.filterYear > beautifed.jobYear) {
      return true;
    } else if (beautifed.filterYear === beautifed.jobYear) {
      if (beautifed.filterMonth > beautifed.jobMonth) {
        return true;
      } else if (beautifed.filterMonth === beautifed.jobMonth) {
          if (beautifed.filterDay >= beautifed.jobDay) {
            return true;
          } else {
            return false;
          }
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  private beautifyDate(job: string, filterDate: string): {
    jobDay: number; jobMonth: number; jobYear: number;
    filterDay: number; filterMonth: number; filterYear: number; } {
    const temp = filterDate.split('/');
    const jobDate = new Date(job);
    const newFilterDate = new Date(`${temp[1]}/${temp[0]}/${temp[2]}`);
    const jobDay = +jobDate.getDate();
    const jobMonth = +jobDate.getMonth() + 1;
    const jobYear = +jobDate.getFullYear();
    const filterDay = +newFilterDate.getDate();
    const filterMonth = +newFilterDate.getMonth() + 1;
    const filterYear = +newFilterDate.getFullYear();

    return {
        jobDay,
        jobMonth,
        jobYear,
        filterDay,
        filterMonth,
        filterYear,
    };
  }
}
