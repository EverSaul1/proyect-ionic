import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginForm, OauthResponse} from "../interface/oauth.interface";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {Storage} from "@ionic/storage-angular";
import {Platform} from "@ionic/angular";
import {from, Observable, of} from "rxjs";
import {StorageService} from "./storage.service";
import {Router} from "@angular/router";
import {UsuarioModels} from "../../models/usuario.model";
import {END_POINTS} from "../../services/utils/end-points";

@Injectable({
  providedIn: 'root'
})
export class Oauth2Service {
  private baseUrl: string = END_POINTS.scary_base;
  private token!: string;
  public usuario!: UsuarioModels;

  constructor(private http: HttpClient,
              private readonly storage: Storage,
              private readonly platform: Platform,
              private storageService: StorageService,
              private router: Router) {
    this.storage.create();
  }

   login(formData: LoginForm) {

    const url = `${this.baseUrl}/auth/login`;
    /*const body = {email, password};*/

    return this.http.post<OauthResponse>(url, formData)
      .pipe(
        tap( (res: any) => {

           this.storage.set('token',res.token);
          console.log(res)
        })
      );
  }

    validarToken(token: string): Observable<boolean>{
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get(`${this.baseUrl}/auth/check-auth-status`, {headers})
        .pipe(
          map((res: any) => {
            const {email, fullName, isActive, avatar, roles, favorites, id} = res;
            this.usuario = new UsuarioModels(email, fullName, isActive, avatar, roles, favorites, id);
            this.storage.set('token',res.token);
            return true
          }),
          catchError(err => of(false))
        );
  }

  logout() {
    this.storageService.remove('token');
    /*this.router.navigateByUrl('/pages/home');*/
    window.location.reload();
  }
}
