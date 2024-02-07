import { Component, OnInit } from '@angular/core';
import {END_POINTS} from "../../../services/utils/end-points";
import {GeneralService} from "../../../services/general.service";
import {Oauth2Service} from "../../../oauth2/service/oauth2.service";
import {UsuarioModels} from "../../../models/usuario.model";
import {LoadingController} from "@ionic/angular";
import {Storage} from "@ionic/storage-angular";
import {da} from "date-fns/locale";

@Component({
  selector: 'app-favorities-home',
  templateUrl: './favorities-home.component.html',
  styleUrls: ['./favorities-home.component.scss'],
})
export class FavoritiesHomeComponent  implements OnInit {

  data: any = [];
  usuario!: UsuarioModels;
  conexion: boolean = false;
  constructor(private generalService: GeneralService,
              private UsuarioService: Oauth2Service,
              private storage: Storage,
              private loadingController: LoadingController) {
    this.usuario = this.UsuarioService.usuario
  }

  ngOnInit() {
    if(this.usuario !== undefined) {
      this.getFavorities();
    }else {
      this.getFovoritosStorage();
    }
  }


  async getFavorities() {
    const loading = await this.loadingController.create({
      message: 'Cargando comentarios...',
      spinner: 'dots',
    });
    await loading.present();
    const serviceName = END_POINTS.base_back.history + '/favorities/all';
    this.generalService.nameAll$(serviceName).subscribe((res: any) => {
      this.data = res.data;
      this.data.map((m: any) => {
        m.total_visto = this.formatDataVistas(m.total_visto);
      })
    }, () => {loading.dismiss()}, () => {loading.dismiss()})
  }
  async getFovoritosStorage() {
    const leidoA = await this.storage.get('leido_array') || [];
    const data = await this.storage.get('favorito_array') || [];
    this.data = data;
    this.data.map((m: any) => {
      m.favorito = true;
      m.leido = leidoA.some((leido: any) => leido.historyId === m.id);
    })
  }
  emmitEventActDataForm($event: boolean) {
    if($event) {
      /*this.getFavorities();*/
      this.getFovoritosStorage();
    }
  }
  formatDataVistas(item: any) {
    const numericItem = Number(item);

    if (isNaN(numericItem)) {
      return 'Valor no válido';
    }

    if (numericItem >= 1000000) {
      const formattedValue = (numericItem / 1000000).toFixed(1);
      return formattedValue + (formattedValue === '1' ? 'M de vista' : 'M de vistas');
    } else if (numericItem >= 1000) {
      const formattedValue = (numericItem / 1000).toFixed(1);
      return formattedValue + (formattedValue === '1' ? 'k vista' : 'k vistas');
    } else if (numericItem === 0) {
      return 'Sin vistas';
    }else {
      return numericItem.toString() + (numericItem === 1 ? ' vista' : ' vistas');
    }
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      this.getFovoritosStorage();
      // Any calls to load data go here
      event.target.complete();
    }, 300);
  };

  valueConexion(event: any){
    this.conexion = event.detail.checked;
    if(this.conexion) {
      this.data = this.data.filter((f: any) => f.type !== 'VIDEO')
      this.data.map((m: any) => {
        m.imagen = null
      })
      console.log(this.data)
    }else {
      this.getFovoritosStorage();
    }
  }

}
