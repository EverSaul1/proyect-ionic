import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


export class EntityDataService<T> {

  constructor(protected httpClient: HttpClient,
              protected endPoint: string) { }
}
