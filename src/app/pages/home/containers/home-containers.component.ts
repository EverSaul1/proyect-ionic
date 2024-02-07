import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {Oauth2Service} from "../../../oauth2/service/oauth2.service";
import {UsuarioModels} from "../../../models/usuario.model";
import {END_POINTS} from "../../../services/utils/end-points";
import {GeneralService} from "../../../services/general.service";
import {HistoryComponent} from "../../category/components/history/history.component";
import {ModalController, NavController} from "@ionic/angular";
import {MSearchComponent} from "../components/modals/m-search/m-search.component";

@Component({
  selector: 'app-home-containers',
  templateUrl: './home-containers.component.html',
  styleUrls: ['./home-containers.component.scss'],
})
export class HomeContainersComponent  implements OnInit {
  cards: any= [];
  dataGigant: any = []
  card_category: any = []
  component =  HistoryComponent;
  slideOptions = {
    slidesPerView: 1.5,
    spaceBetween: 0,
  };
  slideOptions2 = {
    slidesPerView: 4.2,
    spaceBetween: 0,
  };
  usuario!: UsuarioModels;
  a: any;
  constructor(private router: Router,
              private UsuarioService: Oauth2Service,
              private navCtrl: NavController,
              private modalCtrl: ModalController,
              private generalService: GeneralService) {

    this.usuario = this.UsuarioService.usuario
    console.log(this.usuario, 'usuario')

  }

  ngOnInit() {
    this.getHistoryGigant();
    this.getCategoryLimit();
    this.getHistoryLimit();
    this.a = END_POINTS.base_back

  }

  getCategoryLimit() {
    const serviceName = END_POINTS.base_back.category + '/get-category-limit';

    this.generalService.nameAll$(serviceName).subscribe((res: any) => {
      this.card_category = res.data
    })
  }
  getHistoryLimit() {
    const serviceName = END_POINTS.base_back.history + '/get-historia-limit';

    this.generalService.nameAll$(serviceName).subscribe((res: any) => {
      this.cards = res.data
      this.cards.map((m: any) => {
        m.total_visto = this.formatDataVistas(m.total_visto);
      })
    })
  }
  getHistoryGigant() {
    const serviceName = END_POINTS.base_back.history + '/get-historia-limit-gigant';

    this.generalService.nameAll$(serviceName).subscribe((res: any) => {
      this.dataGigant = res.data
    })
  }
  routeNavigate(id: any) {
    this.router.navigate(['pages/category/category-details', id]);
  }
  allCategory() {
    this.router.navigate(['pages/category']);
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

  async navigateUrlHistory(idHistory: any) {
    const modal = await this.modalCtrl.create({
      component: HistoryComponent,
      componentProps: {
        idHistory: idHistory,
        categoryName: 'Home'
      }

    });
    await modal.present();

    const { role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }
  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getHistoryGigant();
      this.getCategoryLimit();
      this.getHistoryLimit();
      event.target.complete();
    }, 2000);
  };

  async openModalSearch() {
    const modal = await this.modalCtrl.create({
      component: MSearchComponent,
      componentProps: {
        title: 'Buscar historia',
      }

    });
    await modal.present();

    const { role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }


}
