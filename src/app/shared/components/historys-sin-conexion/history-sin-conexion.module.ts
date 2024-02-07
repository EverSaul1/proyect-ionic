import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HistorySinConexionComponent} from "./history-sin-conexion.component";
import {IonicModule} from "@ionic/angular";
import {MHistorySinConexionComponent} from "./modals/m-history-sin-conexion/m-history-sin-conexion.component";



@NgModule({
  declarations: [HistorySinConexionComponent, MHistorySinConexionComponent],
  exports: [HistorySinConexionComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class HistorySinConexionModule { }
