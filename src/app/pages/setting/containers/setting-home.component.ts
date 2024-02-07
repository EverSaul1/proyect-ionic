import {Component, OnInit} from '@angular/core';
import {GeneralService} from "../../../services/general.service";
import {Oauth2Service} from "../../../oauth2/service/oauth2.service";
import {UsuarioModels} from "../../../models/usuario.model";
import {ModalController} from "@ionic/angular";
import {MTerminosPrivacidadComponent} from "../components/modals/m-terminos-privacidad/m-terminos-privacidad.component";
import {MPerfilComponent} from "../components/modals/m-perfil/m-perfil.component";
import {Storage} from "@ionic/storage-angular";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-setting-home',
  templateUrl: './setting-home.component.html',
  styleUrls: ['./setting-home.component.scss'],
})
export class SettingHomeComponent  implements OnInit {
  usuario!: UsuarioModels;
  formData: any = FormGroup;
  user: any;
  constructor(private generalService: GeneralService,
              private modalCtrl: ModalController,
              private storage: Storage,
              private fb: FormBuilder,
              private UsuarioService: Oauth2Service) {
    this.usuario = this.UsuarioService.usuario;

  }

  ngOnInit() {
    this.getStorageUser();
  }
  async getStorageUser() {
    return this.user = await this.storage.get('user') || 'NA';
  }
  unlogued() {

    this.UsuarioService.logout();
  }


  async openPoliticas() {
    const modal = await this.modalCtrl.create({
      component: MTerminosPrivacidadComponent,
      componentProps: {}
    });
    await modal.present();

    const {data, role}  = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }

  async openPerfil() {
    const user = await this.storage.get('user') || 'NA';
    console.log(user)
    const modal = await this.modalCtrl.create({
      component: MPerfilComponent,
      componentProps: {
        user: user,
        id: 'open-modal',
      }
    });
    await modal.present();

    const {data, role}  = await modal.onWillDismiss();

    if (role === 'confirm') {

    }
  }


}
