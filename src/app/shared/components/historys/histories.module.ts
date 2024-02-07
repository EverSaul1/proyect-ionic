import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {HistoriesComponent} from "./histories.component";



@NgModule({
  declarations: [HistoriesComponent],
  exports: [
    HistoriesComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class HistoriesModule { }
