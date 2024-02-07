import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Oauth2Service} from "../service/oauth2.service";
import {StorageService} from "../service/storage.service";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NotAutenticateGuard implements CanActivate {
  constructor(private authService: Oauth2Service, private storageService: StorageService, private router: Router) {
  }
  // @ts-ignore
  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {

    console.log('can active activo')
    const token = await this.storageService.get('token')
     await this.authService.validarToken(token).pipe(
      tap(isAutenticate => {
        if(isAutenticate) {
          this.router.navigateByUrl('/')
        }
      }),
       map(() => false)
    ).toPromise();
  }

}
