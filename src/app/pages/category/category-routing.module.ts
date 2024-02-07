import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryPage } from './category.page';
import {CategoryHomeComponent} from "./container/category-home.component";
import {HistoryByCategoryComponent} from "./components/history-by-category/history-by-category.component";
import {HistoryComponent} from "./components/history/history.component";

const routes: Routes = [
  {
    path: '',
    component: CategoryPage,
    children: [
      {
        path: '',
        component: CategoryHomeComponent
      },
      {
        path:'category-details/:idCategory',
        component: HistoryByCategoryComponent,
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
  exports: [RouterModule],
})
export class CategoryPageRoutingModule {}
