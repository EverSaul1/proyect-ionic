import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {tap} from "rxjs/operators";
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient,
              private readonly storage: Storage) {
    this.storage.create();
  }


  crearUsuario(formData: any) {
    return this.http.post(`${this.baseUrl}/auth/register`, formData)
      .pipe(
        tap( (res: any) => {

          this.storage.set('access_token',res.token);
          console.log(res)
        })
      );
  }
}
