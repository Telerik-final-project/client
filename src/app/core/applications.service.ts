import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from './../config/app.config';
import { HttpOptions } from './../models/http-options';
import { JobApplication } from './../models/job-application';

@Injectable()
export class ApplicationsService {
  constructor(private appConfig: AppConfig, private httpClient: HttpClient) {}

  public getById(id: number): Observable<JobApplication> {
    return this.httpClient.get<JobApplication>(
      `${this.appConfig.apiUrl}/applications/${id}`,
    );
  }

  public getAll(): Observable<JobApplication[]> {
    return this.httpClient.get<JobApplication[]>(
      `${this.appConfig.apiUrl}/applications`,
    );
  }

  public getJobApplications(jobId: number): Observable<JobApplication[]> {
    return this.httpClient.get<JobApplication[]>(
      `${this.appConfig.apiUrl}/jobs/${jobId}/applications`,
    );
  }

  public create(application: JobApplication, options?: HttpOptions): Observable<object> {
    return this.httpClient.post(
      `${this.appConfig.apiUrl}/applications/create`,
      application,
      options,
    );
  }

  public downloadFile(file: string): Observable<object> {
    return this.httpClient.get(
      `${this.appConfig.apiUrl}/applications/download/${file}`,
      { responseType: 'blob', observe: 'response' },
    );
  }

  public isUserAppliedForJob(userId: number, jobId: number, options?: HttpOptions): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.appConfig.apiUrl}/applications/check`, {userId, jobId}, options);
  }
}
