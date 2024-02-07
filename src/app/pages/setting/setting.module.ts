import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import {SettingHomeComponent} from "./containers/setting-home.component";
import {SettingComponent} from "./setting.component";
import {IonicModule} from "@ionic/angular";
import {GeneralService} from "../../services/general.service";
import {MTerminosPrivacidadComponent} from "./components/modals/m-terminos-privacidad/m-terminos-privacidad.component";
import {MPerfilComponent} from "./components/modals/m-perfil/m-perfil.component";
import {MAcercaComponent} from "./components/modals/m-acerca/m-acerca.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SettingHomeComponent,
    SettingComponent,
    MTerminosPrivacidadComponent,
    MPerfilComponent,
    MAcercaComponent
  ],
    imports: [
        CommonModule,
        SettingRoutingModule,
        IonicModule,
        ReactiveFormsModule
    ],
  providers: [
    GeneralService
  ]
})
export class SettingModule { }
