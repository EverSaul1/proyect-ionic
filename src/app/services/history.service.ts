import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private baseUrl: string = environment.baseUrl + '/history';
  constructor(private http: HttpClient) { }

  getCategoryByHistory(params: any) {
    return this.http.get(`${this.baseUrl}/get-history-by-category`, {params})
  }
}
