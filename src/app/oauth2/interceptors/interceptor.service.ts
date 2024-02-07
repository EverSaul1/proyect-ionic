import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {from, Observable, throwError} from "rxjs";
import {StorageService} from "../service/storage.service";
import {Oauth2Service} from "../service/oauth2.service";
import {UsuarioModels} from "../../models/usuario.model";
import {catchError, map, switchMap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{
  protected debug = true;
  constructor(private storageService: StorageService) {}
   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    /*const token = await this.storageService.get('token')
    console.log('paso por el interceptor', token);
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    console.log('paso por el interceptor', headers);

    const reqCLone = req.clone({
      headers,
    });
    return next.handle((reqCLone));*/
    return from(this.storageService.get('token')).pipe(
      switchMap((token: any) => {
        if(token) {
          req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }
        if (!req.headers.has('Content-Type')) {
          req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }
        return next.handle(req).pipe(
          map((event: HttpEvent<any>) => {
            if(event instanceof  HttpResponse) {

            }
            return event
          }),
          catchError((error: HttpErrorResponse) => {
            return throwError(error);
          })
        )
      })
    )


  }
}
