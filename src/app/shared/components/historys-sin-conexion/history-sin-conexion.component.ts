import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {MHistorySinConexionComponent} from "./modals/m-history-sin-conexion/m-history-sin-conexion.component";

@Component({
  selector: 'app-history-sin-conexion',
  templateUrl: './history-sin-conexion.component.html',
  styleUrls: ['./history-sin-conexion.component.scss'],
})
export class HistorySinConexionComponent  implements OnInit {


  @Input() historias: any = []
  @Input() usuario: any;
  @Input() msj: any;
  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {}

  async openModal(item: any) {
    const modal = await this.modalCtrl.create({
      component: MHistorySinConexionComponent,
      componentProps: {
        item: item
      }
    });
    await modal.present();
    const {data, role}  = await modal.onWillDismiss();
    if (role === 'confirm') {
    }
  }

}
