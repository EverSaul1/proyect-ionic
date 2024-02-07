import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpBackend, HttpClient} from "@angular/common/http";
import {END_POINTS} from "./utils/end-points";
import {EntityDataService} from "./entity-data.service";
import {Observable} from "rxjs";

@Injectable()
export class GeneralService extends EntityDataService<any>{
  constructor(protected http: HttpClient,
              private handler: HttpBackend) {

        super(http, END_POINTS.scary_base)
  }

  public nameAll$(serviceName: any): Observable<any> {
      return this.http.get<any>(`${this.endPoint}/${serviceName}`);
  }

  public nameParams$(serviceName: any, params: any): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/${serviceName}`, {params});
  }
  public nameId$(serviceName: any, id: any): Observable<any> {
    return this.http.get<any>(`${this.endPoint}/${serviceName}/${id}`);
  }
  public addNameData$(serviceName: any, data: any): Observable<any> {
    return this.http.post<any>(`${this.endPoint}/${serviceName}`, data);
  }
  public deleteNameId$(serviceName: any, id: any): Observable<any> {
    return this.httpClient.delete<any>(`${this.endPoint}/${serviceName}/${id}`);
  }
  public updateNameIdData$(serviceName: any, id: any, data: any): Observable<any> {
    return this.httpClient.patch<any>(`${this.endPoint}/${serviceName}/${id}`, data);
  }
}
