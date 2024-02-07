import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-m-terminos-privacidad',
  templateUrl: './m-terminos-privacidad.component.html',
  styleUrls: ['./m-terminos-privacidad.component.scss'],
})
export class MTerminosPrivacidadComponent  implements OnInit {

  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {}
  cancel() {
    return this.modalCtrl.dismiss('cancel');
  }
}
