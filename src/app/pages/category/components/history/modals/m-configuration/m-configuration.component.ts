import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-m-configuration',
  templateUrl: './m-configuration.component.html',
  styleUrls: ['./m-configuration.component.scss'],
})
export class MConfigurationComponent  implements OnInit {
  fontSize!: string;
  fontInter!: string;
  volumen!: number;
  constructor(private modalCtrl: ModalController,
              private storage: Storage) { }

  async ngOnInit() {
    this.fontSize = await this.storage.get('fontSize');
    this.fontInter = await this.storage.get('fontInter');
    this.volumen = await this.storage.get('volumen') || 1.0;
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  async confirm() {
    await this.storage.set('fontSize', this.fontSize);
    await this.storage.set('fontInter', this.fontInter);
    await this.storage.set('volumen', this.volumen);
    const data = {
      size: this.fontSize,
      inter: this.fontInter,
      volumen: this.volumen,
    }
    return this.modalCtrl.dismiss(data, 'confirm');

  }

  async onVolumeChange(event: any) {
    this.volumen = event.detail.value;
  }
}
