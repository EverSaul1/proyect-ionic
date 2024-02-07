import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import {HomeComponent} from "./home.component";
import {IonicModule} from "@ionic/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HomeContainersComponent} from "./containers/home-containers.component";
import {CarouselModule} from "../../shared/components/carousel/carousel.module";
import {GeneralService} from "../../services/general.service";
import {NativeAudio} from "@awesome-cordova-plugins/native-audio/ngx";
import {Media} from "@ionic-native/media/ngx";
import {HistoryComponent} from "../category/components/history/history.component";
import {CategoryPageModule} from "../category/category.module";
import {MSearchComponent} from "./components/modals/m-search/m-search.component";
import {HistoriesModule} from "../../shared/components/historys/histories.module";


@NgModule({
  declarations: [
    HomeComponent,
    HomeContainersComponent,
    MSearchComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    HomeRoutingModule,
    NgOptimizedImage,
    CarouselModule,
    CategoryPageModule,
    ReactiveFormsModule,
    HistoriesModule
  ],
  providers: [
    GeneralService,
    NativeAudio,
    Media,
  ]
})
export class HomeModule { }
