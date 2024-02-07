import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselComponent} from "./carousel.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [CarouselComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    CarouselComponent
  ]
})
export class CarouselModule { }
