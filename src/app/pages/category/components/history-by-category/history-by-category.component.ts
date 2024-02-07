import {Component, OnInit, ViewChild} from '@angular/core';
import {InfiniteScrollCustomEvent, IonAccordion, LoadingController, ModalController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {MChatsComponent} from "../modals/m-chats/m-chats.component";
import {HistoryService} from "../../../../services/history.service";
import {Oauth2Service} from "../../../../oauth2/service/oauth2.service";
import {UsuarioModels} from "../../../../models/usuario.model";
import {GeneralService} from "../../../../services/general.service";
import {END_POINTS} from "../../../../services/utils/end-points";
import {Storage} from "@ionic/storage-angular";

@Component({
  selector: 'app-history-by-category',
  templateUrl: './history-by-category.component.html',
  styleUrls: ['./history-by-category.component.scss'],
})
export class HistoryByCategoryComponent  implements OnInit {
  @ViewChild('accordion1') accordion1!: IonAccordion;
  cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  historias = [1, 2, 3, 4, 5];
  items: any = [];
  slideOptions = {
    slidesPerView: 1,
    spaceBetween: 0,
  };
  idCategory: any;
  usuario!: UsuarioModels;
  data: any = [];
  nameCategory!: string;
  datafilterFavorite: any = [];
  datafilterNoFavorite: any = [];
  constructor(private router: Router,
              private modalCtrl: ModalController,
              private historyService: HistoryService,
              private storage: Storage,
              private loadingController: LoadingController,
              private activatedRoute: ActivatedRoute,
              private UsuarioService: Oauth2Service,
              private generalService: GeneralService) {

    this.idCategory = this.activatedRoute.snapshot.paramMap.get('idCategory');
    this.usuario = this.UsuarioService.usuario
    console.log(this.usuario, 'usuario')
  }
  ngOnInit() {
    this.generateItems();
    this.getCategoryName();
    this.getHistory();
  }

  private generateItems() {
    const count: number = this.items.length + 1;
    for (let i = 0; i < 50; i++) {
      this.items.push(`Item ${count + i}`);
    }
  }

  onIonInfinite(ev: any) {
    console.log(ev)
    console.log(this.items)
    this.generateItems();
    setTimeout(() => {
      (ev as InfiniteScrollCustomEvent).target.complete();
    }, 500);
  }
  getCategoryName() {
    const serviceName = END_POINTS.base_back.category;

    this.generalService.nameId$(serviceName, this.idCategory).subscribe((res: any) => {
      this.nameCategory = res.name;
    })
  }

  async getHistory() {
    const serviceName = END_POINTS.base_back.history + '/get-history-by-category'
    const favoritoA = await this.storage.get('favorito_array') || [];
    const leidoA = await this.storage.get('leido_array') || [];
    const loading = await this.loadingController.create({
      message: 'Cargando',
      spinner: 'circles',
    });
    if(this.usuario === undefined || this.usuario === null) {
      const params = {
        usuarioType: 'N',
        categoryId: this.idCategory,
      }
      await loading.present()
      this.generalService.nameParams$(serviceName, params).subscribe( (res: any) => {
        this.data = res.data
        this.data.map((m: any) => {
          m.total_visto = this.formatDataVistas(m.total_visto);
          m.favorito = favoritoA.some((favorito: any) => favorito.id === m.id);
          m.leido = leidoA.some((leido: any) => leido.historyId === m.id);

        })
      }, () => {loading.dismiss()}, () => {loading.dismiss()})
    }else {
      const params = {
        usuarioType: 'S',
        categoryId: this.idCategory,
        userId: this.usuario.id
      }
      await loading.present()
      this.generalService.nameParams$(serviceName, params).subscribe((res: any) => {
        this.data = res.data
        this.data.map((m: any) => {
          m.total_visto = this.formatDataVistas(m.total_visto);
        })
      }, () => {loading.dismiss()}, () => {loading.dismiss()})
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
  emmitEventActDataForm($event: boolean) {
    if($event) {
      this.getHistory();
    }
  }
  handleRefresh(event: any) {
    this.getHistory();
    event.target.complete();
  }

  navigator() {
    this.router.navigateByUrl('pages/category')
  }
}
