import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScaffoltComponent} from "./scaffolt/scaffolt.component";
import {IonicModule} from "@ionic/angular";
import {RouterModule} from "@angular/router";
import {CoreRoutingModule} from "./core-routing.module";

@NgModule({
  declarations: [ScaffoltComponent],
  exports: [
    ScaffoltComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule,
    CoreRoutingModule,

  ]
})
export class CoreModule { }
