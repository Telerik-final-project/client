import { HttpHeaders, HttpParams } from '@angular/common/http';

export class HttpOptions {
    public headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    public observe?;
    public body?;
    public params?: HttpParams | {
        [param: string]: string | string[];
    };
    public reportProgress?: boolean;
    public responseType: 'json';
    public withCredentials?: boolean;
}
