import { Component, OnInit } from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {FormControl, Validators} from "@angular/forms";
import {UsuarioModels} from "../../../../../models/usuario.model";
import {Oauth2Service} from "../../../../../oauth2/service/oauth2.service";
import {GeneralService} from "../../../../../services/general.service";
import {END_POINTS} from "../../../../../services/utils/end-points";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-m-search',
  templateUrl: './m-search.component.html',
  styleUrls: ['./m-search.component.scss'],
})
export class MSearchComponent  implements OnInit {
  termino:any = new FormControl('', [Validators.required, Validators.minLength(2)])
  data: any = [];
  usuario!: UsuarioModels;
  msj: any = '';
  constructor(private modalCtrl: ModalController,
              private storage: Storage,
              private UsuarioService: Oauth2Service,
              private loadingController: LoadingController,
              private generalService: GeneralService) {
    this.usuario = this.UsuarioService.usuario
  }

  ngOnInit() {}
  cancel() {
    this.modalCtrl.dismiss('cancel')
  }
  async getHistoryAll (){
    const serviceName = END_POINTS.base_back.history + '/get-history-all';
    const favoritoA = await this.storage.get('favorito_array') || [];
    const leidoA = await this.storage.get('leido_array') || [];
    const params = {
      usuarioType: 'N',
      search: this.termino.value
    }
    const loading = await this.loadingController.create({
      message: 'Cargando',
      spinner: 'circles',
    });

    if (this.termino.value) {
      await loading.present()
      this.generalService.nameParams$(serviceName, params).subscribe((res: any) => {
        if(res.success){
          this.data = res.data;
          this.msj = this.termino.value
          this.data.map((m: any) => {
            m.total_visto = this.formatDataVistas(m.total_visto);
            m.favorito = favoritoA.some((favorito: any) => favorito.id === m.id);
            m.leido = leidoA.some((leido: any) => leido.historyId === m.id);

          })
        }

      }, () => {loading.dismiss()}, () => {loading.dismiss()})
    }

  }
  handleRefresh(event: any) {
    this.getHistoryAll();
    event.target.complete();
  }

  emmitEventActDataForm($event: boolean) {
    if($event) {
     this.getHistoryAll();
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

}
