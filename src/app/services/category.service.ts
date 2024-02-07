import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl: string = environment.baseUrl + '/category';
  constructor(private http: HttpClient) { }

  getCategory() {
    return this.http.get(`${this.baseUrl}`)
  }
}
