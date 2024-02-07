import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {IonSlides, ModalController} from "@ionic/angular";
import {navigate} from "ionicons/icons";
import {Router} from "@angular/router";
import {HistoryComponent} from "../../../pages/category/components/history/history.component";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent  implements OnInit {
  @ViewChild(IonSlides) slides!: IonSlides;
  @Input() dataGigant: any = [];
  activeSlide = 0;
  images: string[] = [
    'https://ionicframework.com/docs/img/demos/card-media.png',
    'https://ionicframework.com/docs/img/demos/card-media.png',
    'https://ionicframework.com/docs/img/demos/card-media.png',
    'https://ionicframework.com/docs/img/demos/card-media.png',
  ];
  constructor(private router: Router,
              private modalCtrl: ModalController,) { }

  ngOnInit() {
    this.startAutoPlay();
  }
  startAutoPlay() {
    setInterval(() => {
      this.slides.isEnd().then(isEnd => {
        if (isEnd) {
          this.slides.slideTo(0);
        } else {
          this.slides.slideNext();
        }
      });
    }, 20000);
  }
  goToSlide(index: number) {
    this.slides.slideTo(index);
  }

  onSlideChanged() {
    this.slides.getActiveIndex().then(index => {
      this.activeSlide = index;
    });
  }
  async navigateUrlHistory(idHistory: string) {
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
    }  }
}
