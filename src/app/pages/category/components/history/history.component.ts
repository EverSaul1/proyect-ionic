import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {
  AlertController, IonAccordionGroup,
  IonModal,
  IonSlides, LoadingController,
  ModalController, Platform,
  PopoverController,
  ToastController
} from "@ionic/angular";
import {Storage} from "@ionic/storage-angular";
import {MConfigurationComponent} from "./modals/m-configuration/m-configuration.component";
import {MMusicComponent} from "./modals/m-music/m-music.component";
import {MChatsComponent} from "../modals/m-chats/m-chats.component";
import {END_POINTS} from "../../../../services/utils/end-points";
import {Oauth2Service} from "../../../../oauth2/service/oauth2.service";
import {UsuarioModels} from "../../../../models/usuario.model";
import {ActivatedRoute, Router} from "@angular/router";
import {GeneralService} from "../../../../services/general.service";
import {DomSanitizer} from "@angular/platform-browser";
/*import {Media, MediaObject} from "@ionic-native/media";*/
import {Media, MediaObject} from "@ionic-native/media/ngx";
import {NativeAudio} from '@capacitor-community/native-audio'
import {Subscription} from "rxjs";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  @ViewChild('slides', {static: false}) slides!: IonSlides;
  @ViewChild('accordionGroup', {static: false}) accordionGroup!: IonAccordionGroup;
  @Input() idHistory: any
  @Input() categoryName: any;
  slideProgress: number = 0;
  selectedFontSize!: string;
  selectInterlineado!: string;
  history: any
  videoEmbedYoutube: any;
  slideOptions = {
    slidesPerView: 3.3,
    spaceBetween: 8,
  };
  cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  playlist: any = [
    {
      id: 1,
      title: 'Laberinto de fauno',
      src: 'assets/sounds/lbf.mp3'
    },
    {
      id: 2,
      title: 'Death ',
      src: 'assets/sounds/death.mp3'
    }
  ]
  usuario!: UsuarioModels;
  progress!: number;
  data: any;
  dataRecomendation: any = [];
  audio!: MediaObject;
  isPlaying = false;
  url: string = 'assets/sounds/lbf.mp3';
  volumenMusica!: number;
  private audioInterval: any;
  log: boolean = false;
  reproducir: boolean = false;

  @ViewChild(IonModal) modal!: IonModal;

  constructor(private alertController: AlertController,
              private modalCtrl: ModalController,
              private storage: Storage,
              private sanitizer: DomSanitizer,
              private toastController: ToastController,
              private UsuarioService: Oauth2Service,
              private activatedRoute: ActivatedRoute,
              private generalService: GeneralService,
              private loadingController: LoadingController,
              private popoverController: PopoverController,
              private router: Router,
              /* private natiAudio: NativeAudio,*/
              private media: Media) {
    /*this.idHistory = this.activatedRoute.snapshot.paramMap.get('id');*/
    this.usuario = this.UsuarioService.usuario;
  }


  ngOnDestroy(): void {
    NativeAudio.unload({
      assetId: 'lbf',
    });
    this.stopAudio();
    }

  async soundPreload() {
    await NativeAudio.preload({
      assetId: 'lbf',
      assetPath: "rain.mp3",
      audioChannelNum: 1,
      isUrl: false
    });

  }
   ngOnInit() {
    this.initStorage();
    this.getHistory();
    this.soundPreload();
    this.countVistoALL(this.idHistory);
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
  async playMusic(play: boolean) {
    this.isPlaying = play;
    await NativeAudio.play({
      assetId: 'lbf',
      time:1
    });
    await NativeAudio.setVolume({
      assetId: 'lbf',
      volume: this.volumenMusica,
    });
    if(!play){
      await NativeAudio.setVolume({
        assetId: 'lbf',
        volume: 0.0,
      });
    }

  }
  async stopAudio() {
    await NativeAudio.stop({
      assetId: 'lbf',
    });
    clearInterval(this.audioInterval);
  }
  async initStorage() {
    await this.storage.create();
    this.selectInterlineado = await this.storage.get('fontInter') || '2.5';
    this.selectedFontSize = await this.storage.get('fontSize') || '13px';
    this.volumenMusica = await this.storage.get('volumen') || 1.0;
  }
  async openConfiguration() {
    const modal = await this.modalCtrl.create({
      component: MConfigurationComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {

      this.selectedFontSize = data.size;
      this.selectInterlineado = data.inter;
      this.volumenMusica = data.volumen;
      this.volumentSet(data.volumen);
    }
  }
  async volumentSet(volumen: any){
    this.isPlaying = true;
    await NativeAudio.setVolume({
      assetId: 'lbf',
      volume: volumen,
    });
  }

  async openPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: MMusicComponent,
      event: ev,
      translucent: true,
    });
    await popover.present();
  }
  async openChat(historiaID: string) {

    const modal = await this.modalCtrl.create({
      component: MChatsComponent,
      componentProps: {
        historiaID: historiaID,
        userservice: this.usuario
      }

    });
    await modal.present();

    const { role } = await modal.onWillDismiss();

    if (role === 'confirm') {
    }
  }
  async getHistory() {
    const serviceName = END_POINTS.base_back.history + '/get-history';
    const favoritoA = await this.storage.get('favorito_array') || [];
    const leidoA = await this.storage.get('leido_array') || [];
    const loading = await this.loadingController.create({
      message: 'Cargando',
      spinner: 'circles',
    });
    if(this.usuario === undefined || this.usuario === null){
      const params = {
        usuarioType: 'N',
        historyId: this.idHistory,
      }
      await loading.present()
      this.generalService.nameParams$(serviceName, params).subscribe((res: any) => {
        if( res.success) {
          this.getHistoryRecomendation();
          this.data = res.data
          this.data.total_visto = this.formatDataVistas(this.data.total_visto);
          this.data.leido = leidoA.some((leido: any) => leido.historyId !== undefined && leido.historyId === this.data.id);
          this.data.favorito = favoritoA.some((favorito: any) => favorito.id === this.data.id);
          if (this.data.type === 'VIDEO') {
            let urlID = this.parseVideo(this.data.url);
            this.data.urlYoutube = `https://www.youtube.com/embed/${urlID.id}?showinfo=0`
            setTimeout(() => {
              this.playMusic(false);
            }, 500)
          }else {
            setTimeout(() => {
              this.playMusic(true);
            }, 100)
          }

        }

      }, () => {loading.dismiss(); this.log = true}, () => {loading.dismiss()})
    }else {
      const params = {
        usuarioType: 'S',
        userId: this.usuario.id,
        historyId: this.idHistory,
      }
      await loading.present()
      this.generalService.nameParams$(serviceName, params).subscribe((res: any) => {
        if( res.success) {
          this.data = res.data;
          this.data.total_visto = this.formatDataVistas(this.data.total_visto);
        }
      }, () => {loading.dismiss()}, () => {loading.dismiss()})
    }

  }
  getHistoryRecomendation(){
    const serviceName = END_POINTS.base_back.history + '/get-history-recomendaciones';
    const params = {
      idHistory: this.idHistory
    }
    this.generalService.nameParams$(serviceName, params).subscribe((res: any) => {
      this.dataRecomendation = res.data
    })
  }
  countVistoALL(historyID: any) {
    const serviceName = END_POINTS.base_back.history + '/add-count-visto';
    const paramas = {
      history: historyID
    }
    this.generalService.addNameData$(serviceName, paramas).subscribe();
  }

   favorito(item: any) {
    if(item.favorities_id === null) {
      const serviceName = END_POINTS.base_back.history + '/add-favorite'
      const body = {
        history: item.id
      }
      this.generalService.addNameData$(serviceName, body).subscribe((res: any) => {
        if(res.success) {
          this.presentToast('Añadido a favoritos', 'success');
          this.getHistory();
        }
      })
    }else {
      const serviceName = END_POINTS.base_back.history + '/favorities';

      this.generalService.deleteNameId$(serviceName, item.favorities_id).subscribe(res => {
        if(res.success) {
          this.presentToast('Eliminado de favoritos', 'danger');
          this.getHistory();
        }
      })
    }
  }
  leido(item: any) {
    if(item.read_id === null) {
      const serviceName = END_POINTS.base_back.history + '/add-read'
      const body = {
        history: item.id
      }
      this.generalService.addNameData$(serviceName, body).subscribe((res: any) => {
        if(res.success) {
          this.presentToast('Marcado como leído', 'success');
          this.getHistory();
        }
      })
    }else {
      const serviceName = END_POINTS.base_back.history + '/read';

      this.generalService.deleteNameId$(serviceName, item.read_id).subscribe(res => {
        if(res.success) {
          this.presentToast('Eliminado', 'danger');
          this.getHistory();
        }
      })
    }
  }
  async leidoStorage(item: any) {
    if(item.leido){
      const leidoA = await this.storage.get('leido_array');

      const nuevoFavoritoA = leidoA.filter((f: any) => f.historyId !== item.id);
      await this.storage.set('leido_array', nuevoFavoritoA);
      this.presentToast('Eliminado', 'danger');
      this.getHistory();

    }else {
      let arr: any = await this.storage.get('leido_array') || [];
      const obj = {
        historyId: item.id
      }
      arr.push(obj)
      await this.storage.set('leido_array', arr);
      this.presentToast('Marcado como leído', 'success');

      this.getHistory();
    }

  }

  async favoritoStorage(data: any) {
    if(data.favorito){
      const favoritosA = await this.storage.get('favorito_array');

      const nuevoFavoritoA = favoritosA.filter((f: any) => f.id !== data.id);
      await this.storage.set('favorito_array', nuevoFavoritoA);
      this.presentToast('Eliminado de favoritos', 'danger');
      this.getHistory();

    }else {
      let arr: any = await this.storage.get('favorito_array') || [];
      arr.push(data)
      /*const string = JSON.stringify(arr)*/
      await this.storage.set('favorito_array', arr);
      this.presentToast('Añadido a favoritos', 'success');

      this.getHistory();
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
  parseVideo(url: any) {
    url.match(/(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/);
    let type = ''; // Declarar la variable fuera de los bloques if

    if (RegExp.$3.indexOf('youtu') > -1) {
      type = 'youtube'; // Asignar el valor en lugar de declarar otra vez
    } else if (RegExp.$3.indexOf('vimeo') > -1) {
      type = 'vimeo'; // Asignar el valor en lugar de declarar otra vez
    }

    return {
      type: type,
      id: RegExp.$6
    };
  }

  async toggleAudio() {
    if (this.isPlaying) {
      await NativeAudio.setVolume({
        assetId: 'lbf',
        volume: 0.0,
      });
    } else {
      await NativeAudio.setVolume({
        assetId: 'lbf',
        volume: this.volumenMusica,
      });
    }
    this.isPlaying = !this.isPlaying;
  }

  async playPodcast(data: any){

    if(this.reproducir) {
      this.reproducir = false
    }else {
      this.reproducir = true;
    }

  }
  toggleAccordion = () => {
    const nativeEl = this.accordionGroup;
    if (nativeEl.value === 'first') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'first';
      setTimeout(() => {
        nativeEl.value = undefined;
      }, 10000)
    }
  };

  navigatorHistoryRecomendation(id: string) {
    this.idHistory = id;
    this.getHistory();
    this.getHistoryRecomendation()
  }
  get urlIframe(){
    console.log(this.data?.url)
    return this.data?.url
  }

}
