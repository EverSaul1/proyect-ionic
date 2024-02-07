import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {CoreModule} from "./core/core.module";
import {
  HistoryByCategoryComponent
} from "./pages/category/components/history-by-category/history-by-category.component";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HistoriesModule} from "./shared/components/historys/histories.module";
import {IonicStorageModule} from "@ionic/storage-angular";
import {InterceptorService} from "./oauth2/interceptors/interceptor.service";

@NgModule({
  declarations: [AppComponent, HistoryByCategoryComponent],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule, CoreModule, HttpClientModule, HistoriesModule, IonicStorageModule.forRoot()],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
