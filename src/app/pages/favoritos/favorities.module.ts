import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritiesRoutingModule } from './favorities-routing.module';
import {FavoritiesComponent} from "./favorities.component";
import {IonicModule} from "@ionic/angular";
import {FavoritiesHomeComponent} from "./containers/favorities-home.component";
import {HistoriesModule} from "../../shared/components/historys/histories.module";
import {GeneralService} from "../../services/general.service";
import {HistorySinConexionModule} from "../../shared/components/historys-sin-conexion/history-sin-conexion.module";
import {NativeAudio} from "@awesome-cordova-plugins/native-audio/ngx";
import {Media} from "@ionic-native/media/ngx";


@NgModule({
  declarations: [FavoritiesComponent, FavoritiesHomeComponent],
  imports: [
    CommonModule,
    FavoritiesRoutingModule,
    IonicModule,
    HistoriesModule,
    HistorySinConexionModule
  ],
  providers: [
    GeneralService,
    NativeAudio,
    Media,
  ]
})
export class FavoritiesModule { }
