import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FavoritiesComponent} from "./favorities.component";
import {FavoritiesHomeComponent} from "./containers/favorities-home.component";
import {HistoryComponent} from "../category/components/history/history.component";

const routes: Routes = [
  {
    path: '',
    component: FavoritiesComponent,
    children: [
      {
        path: '',
        component: FavoritiesHomeComponent
      },
      {
        path: 'history/:id',
        component: HistoryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritiesRoutingModule { }
