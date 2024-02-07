import {Component, Input, OnInit} from '@angular/core';
import {LoadingController, ModalController} from "@ionic/angular";
import {FormControl, Validators} from "@angular/forms";
import {END_POINTS} from "../../../../../../services/utils/end-points";
import {GeneralService} from "../../../../../../services/general.service";

@Component({
  selector: 'app-m-edit-chat',
  templateUrl: './m-edit-chat.component.html',
  styleUrls: ['./m-edit-chat.component.scss'],
})
export class MEditChatComponent  implements OnInit {

  @Input() comentarioItem: any
  comentario: any = new FormControl('', Validators.required);
  constructor(private modalCtrl: ModalController,
              private generalService: GeneralService,
              private loadingController: LoadingController) { }

  ngOnInit() {
    this.comentario.setValue(this.comentarioItem.comentario)
  }

  cancel() {
    return this.modalCtrl.dismiss('cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss('confirm');

  }

  async actualizarComentario() {
    const loading = await this.loadingController.create({
      message: 'Actualizando...',
      spinner: 'dots',
    });
    try {
      await loading.present();
      const serviceName = END_POINTS.base_back.comentarios;
      const paramas = {
        comentario: this.comentario.value,
      }

      this.generalService.updateNameIdData$(serviceName, this.comentarioItem.id, paramas).subscribe((res: any) => {
        if(res.success){
          this.modalCtrl.dismiss(null, 'confirm');
        }
      })
    } finally {
      await loading.dismiss();
    }
  }

}
