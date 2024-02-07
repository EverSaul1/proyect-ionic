import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-m-history-sin-conexion',
  templateUrl: './m-history-sin-conexion.component.html',
  styleUrls: ['./m-history-sin-conexion.component.scss'],
})
export class MHistorySinConexionComponent  implements OnInit {

  @Input() item: any;
  constructor(private modalCtrl: ModalController,
              private storage: Storage,) { }
  selectedFontSize!: string;
  selectInterlineado!: string;
  ngOnInit() {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
    this.selectInterlineado = await this.storage.get('fontInter') || '2.5';
    this.selectedFontSize = await this.storage.get('fontSize') || '12px';
  }
  cancel() {
    return this.modalCtrl.dismiss('cancel');
  }
}
