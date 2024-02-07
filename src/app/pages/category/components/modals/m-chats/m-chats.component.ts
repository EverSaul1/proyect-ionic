import {Component, Input, OnInit} from '@angular/core';
import {AlertController, LoadingController, ModalController, ToastController} from "@ionic/angular";
import {formatDate} from "@angular/common";
import {END_POINTS} from "../../../../../services/utils/end-points";
import {GeneralService} from "../../../../../services/general.service";
import {FormControl, Validators} from "@angular/forms";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths, differenceInYears,
  formatDistance,
  formatDistanceToNow
} from 'date-fns';
import es from 'date-fns/locale/es';
import {MEditChatComponent} from "./m-edit-chat/m-edit-chat.component";
import {Storage} from "@ionic/storage-angular";
import {MCreateUserComponent} from "./m-create-user/m-create-user.component";

@Component({
  selector: 'app-m-chats',
  templateUrl: './m-chats.component.html',
  styleUrls: ['./m-chats.component.scss'],
})
export class MChatsComponent  implements OnInit {

  @Input() historiaID: any;
  @Input() userservice: any;
  comentarios: any[] = [];
  user: any;
  termino:any = new FormControl('', Validators.required)
  constructor(private modalCtrl: ModalController,
              private generalService: GeneralService,
              private storage: Storage,
              private alertController: AlertController,
              private toastController: ToastController,
              private loadingController: LoadingController,) { }

  ngOnInit() {
    this.getComentarios();
    this.getUsuarioStorage();
  }
  cancel() {
    return this.modalCtrl.dismiss('cancel');
  }

  async confirm() {
    return this.modalCtrl.dismiss('confirm');

  }

  async getUsuarioStorage(){
   this.user = await this.storage.get('user') || '';
  }
  async getComentarios() {
    const loading = await this.loadingController.create({
      message: 'Cargando comentarios...',
      spinner: 'dots',
    });
    try {
      await loading.present();
      const serviceName = END_POINTS.base_back.comentarios;
      this.generalService.nameId$(serviceName, this.historiaID).subscribe((res: any) => {
        this.comentarios = res.data;
        this.comentarios.map((m: any) => {
          m.fecha = this.fechaDinamico(m.fecha);
        })
        console.log(this.comentarios)
      })
    } finally {
      await loading.dismiss();
    }
  }
  fechaDinamico(date: any) {
    const fechaActual = new Date();
    const diferenciaEnMinutos = differenceInMinutes(fechaActual, new Date(date));

    if (diferenciaEnMinutos < 60) {
      return `${diferenciaEnMinutos} min`;
    } else {
      const diferenciaEnHoras = differenceInHours(fechaActual, new Date(date));

      if (diferenciaEnHoras < 24) {
        return `${diferenciaEnHoras}h`;
      } else {
        const diferenciaEnDias = differenceInDays(fechaActual, new Date(date));

        if (diferenciaEnDias < 30) {
          return `${diferenciaEnDias}d`;
        } else {
          const diferenciaEnMeses = differenceInMonths(fechaActual, new Date(date));

          if (diferenciaEnMeses < 12) {
            return `${diferenciaEnMeses} meses`;
          } else {
            const diferenciaEnAnios = differenceInYears(fechaActual, new Date(date));
            return `${diferenciaEnAnios} años`;
          }
        }
      }
    }

  }

  async addComentario() {
    if(this.userservice === undefined) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Usted no esta logueado!',
        buttons: ['OK'],
      });

      await alert.present();
    }else {
      const serviceName = END_POINTS.base_back.comentarios + '/sin-autenticar';
      const now = new Date();
      const params = {
        comentario: this.termino.value,
        fecha: now,
        history: this.historiaID,
      }

      this.generalService.addNameData$(serviceName, params).subscribe((res: any) => {
        if(res.success){
          this.termino.setValue('')
          this.getComentarios();
        }
      })
    }
  }
  async addComentarioSinAutenticar() {
    const data = await this.storage.get('user');
    if(!data) {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Usted no genero un usuario!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          },
          {
            text: 'Generar',
            role: 'confirm',
            handler: async () => {
              const modal = await this.modalCtrl.create({
                component: MCreateUserComponent,
                componentProps: {}
              });
              await modal.present();
              const {data, role}  = await modal.onWillDismiss();
              if (role === 'confirm') {
                this.getComentarios();
                this.presentToast('Usuario generado', 'success');
              }
            },
          },
        ],
      });
      await alert.present();
    }else {
      const serviceName = END_POINTS.base_back.comentarios + '/sin-autenticar';
      const now = new Date();
      const params = {
        comentario: this.termino.value,
        fecha: now,
        history: this.historiaID,
        email: data.email,
        fullName: data.nombre,
        avatar: data.avatar,
        autenticate: 'N'
      }

      this.generalService.addNameData$(serviceName, params).subscribe((res: any) => {
        if(res.success){
          this.termino.setValue('')
          this.presentToast('Comentario creado', 'success');
          this.getComentarios();
        }
      })
    }
  }

  async editComentario(item: any) {
    const serviceName = END_POINTS.base_back.comentarios;
    this.dismissModal();
    const modal = await this.modalCtrl.create({
      component: MEditChatComponent,
      componentProps: {
        comentarioItem: item,
      }
    });
    await modal.present();

    const {data, role}  = await modal.onWillDismiss();

    if (role === 'confirm') {
        this.getComentarios();
        this.presentToast('Se edito correctamente', 'success');
    }

  }
  async eliminarComentario(id: any) {
    this.dismissModal();
    const alert = await this.alertController.create({
      header: '¿Está seguro de eliminar el comentario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: async () => {
            const loading = await this.loadingController.create({
              message: 'Eliminando comentario...',
              spinner: 'dots',
            });
            try {
              await loading.present();
              const serviceName = END_POINTS.base_back.comentarios;
              this.generalService.deleteNameId$(serviceName, id).subscribe((res: any) => {
                if(res.success){
                  this.presentToast('Eliminado', 'danger');
                }
              });
            } finally {
              await loading.dismiss();
            }
          },
        },
      ],
    })
    await alert.present();

    const { role } = await alert.onDidDismiss();

    if(role === 'confirm') {
      this.getComentarios();
    }
  }
  setValueNombre(name: string) {
    this.termino.setValue('@'+name)
    this.dismissModal();
  }
  dismissModal() {
    this.modalCtrl.dismiss();
  }
  handleRefresh(event: any) {
    this.getComentarios();
    event.target.complete();
  }

  async presentToast(mjs: string, color: string) {
    const toast = await this.toastController.create({
      message: mjs,
      duration: 1500,
      color: color,
      position: 'bottom',
    });

    await toast.present();
  }
}
