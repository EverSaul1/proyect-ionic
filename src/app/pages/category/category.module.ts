import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryPageRoutingModule } from './category-routing.module';

import { CategoryPage } from './category.page';
import {CategoryHomeComponent} from "./container/category-home.component";
import {HistoryComponent} from "./components/history/history.component";
import {MConfigurationComponent} from "./components/history/modals/m-configuration/m-configuration.component";
import {MMusicComponent} from "./components/history/modals/m-music/m-music.component";
import {MChatsComponent} from "./components/modals/m-chats/m-chats.component";
import {GeneralService} from "../../services/general.service";
import {MEditChatComponent} from "./components/modals/m-chats/m-edit-chat/m-edit-chat.component";
import {MCreateUserComponent} from "./components/modals/m-chats/m-create-user/m-create-user.component";
import {SafeUrlModule} from "../../shared/pipes/safe-url.module";
import {Media} from "@ionic-native/media/ngx";
import {NativeAudio} from "@awesome-cordova-plugins/native-audio/ngx";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryPageRoutingModule,
    ReactiveFormsModule,
    SafeUrlModule,
  ],
  declarations: [CategoryPage,MCreateUserComponent, CategoryHomeComponent,HistoryComponent,MConfigurationComponent, MMusicComponent,MChatsComponent, MEditChatComponent],
  providers: [
    GeneralService,
    Media,
    NativeAudio

  ]
})
export class CategoryPageModule {}
