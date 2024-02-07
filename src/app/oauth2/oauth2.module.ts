import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Oauth2RoutingModule } from './oauth2-routing.module';
import {Oauth2MainComponent} from "./contents/oauth2-main.component";
import {IonicModule} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [Oauth2MainComponent],
  imports: [
    CommonModule,
    Oauth2RoutingModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class Oauth2Module { }
