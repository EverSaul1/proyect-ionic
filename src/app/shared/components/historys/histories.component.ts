import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Router} from "@angular/router";
import {MChatsComponent} from "../../../pages/category/components/modals/m-chats/m-chats.component";
import {ModalController, ToastController} from "@ionic/angular";
import {END_POINTS} from "../../../services/utils/end-points";
import {GeneralService} from "../../../services/general.service";
import {Storage} from "@ionic/storage-angular";
import {HistoryComponent} from "../../../pages/category/components/history/history.component";

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.scss'],
})
export class HistoriesComponent  implements OnInit {

  @Input() historias: any = []
  @Input() usuario: any;
  @Input() msj: any;
  @Output() emmitEventActData: EventEmitter<boolean> = new EventEmitter();
  @Input() categoryName: any;
  constructor(private router: Router,
              private modalCtrl: ModalController,
              private storage: Storage,
              private toastController: ToastController,
              private generalService: GeneralService) { }

  ngOnInit() {}
  async routeNavigate(id: any) {
    if(this.msj !== 'Favoritos'){
      /*this.router.navigate(['pages/category/history', id]);*/
      const modal = await this.modalCtrl.create({
        component: HistoryComponent,
        componentProps: {
          idHistory: id,
          categoryName: this.categoryName
        }
      });
      await modal.present();

      const { data, role } = await modal.onWillDismiss();
      console.log(role)
      if (role === 'cancel') {

      }

    }
    if(this.msj === 'Favoritos'){
      /*this.router.navigate(['pages/favorities/history', id]);*/
      const modal = await this.modalCtrl.create({
        component: HistoryComponent,
        componentProps: {
          idHistory: id,
          categoryName: this.categoryName
        }
      });
      await modal.present();

      const { data, role } = await modal.onWillDismiss();
      console.log(role)
      if (role === 'cancel') {

      }
    }
  }
  async openChat() {
    const modal = await this.modalCtrl.create({
      component: MChatsComponent,
      componentProps: {
        itemsss: 'hola',
      }

    });
    await modal.present();

    const { role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }

  addfavoritos(item: any) {
    if(item.favorities_id === null) {
      const serviceName = END_POINTS.base_back.history + '/add-favorite'
      const body = {
        history: item.id
      }
      this.generalService.addNameData$(serviceName, body).subscribe((res: any) => {
        if(res.success) {
          this.emmitEventActData.emit(true);
        }
      })
    }else {
      const serviceName = END_POINTS.base_back.history + '/favorities';

      this.generalService.deleteNameId$(serviceName, item.favorities_id).subscribe(res => {
        if(res.success) {
          this.emmitEventActData.emit(true);
        }
      })
    }

  }

 async addfavoritosStorage(item: any){
    if(item.favorito){
      const favoritosA = await this.storage.get('favorito_array');

      const nuevoFavoritoA = favoritosA.filter((f: any) => f.id !== item.id);

      await this.storage.set('favorito_array', nuevoFavoritoA);
      this.presentToast('Eliminado de favoritos', 'danger');
      this.emmitEventActData.emit(true);

    }else {
      let arr: any = await this.storage.get('favorito_array') || [];
      arr.push(item)
      /*const string = JSON.stringify(arr)*/
      await this.storage.set('favorito_array', arr);
      this.presentToast('Añadido a favoritos', 'success');
      this.emmitEventActData.emit(true);
    }

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
