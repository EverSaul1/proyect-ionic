import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {Oauth2Guard} from "./oauth2/guards/oauth2.guard";
import {NotAutenticateGuard} from "./oauth2/guards/not-autenticate.guard";

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pages/home',
      },
      {
        path: 'pages',
        canActivate:[Oauth2Guard],
        loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
      },
      {
        path: 'auth',
        canActivate:[NotAutenticateGuard],
        loadChildren: () => import('./oauth2/oauth2.module').then((m) => m.Oauth2Module)
      },
      {
        path: '**',
        redirectTo: 'pages/home'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
