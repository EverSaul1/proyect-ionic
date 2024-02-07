import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {Oauth2MainComponent} from "./contents/oauth2-main.component";

const routes: Routes = [
  {
    path: 'login',
    component: Oauth2MainComponent,
  },
  {
    path: '**',
    redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Oauth2RoutingModule { }
