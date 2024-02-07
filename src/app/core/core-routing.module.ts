import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ScaffoltComponent} from "./scaffolt/scaffolt.component";

const routes: Routes = [
  {
    path: '',
    component: ScaffoltComponent,
    children: [
      {
        path: 'category',
        loadChildren: () => import('../pages/category/category.module').then((m) => m.CategoryPageModule),
      },
      {
        path: 'home',
        loadChildren: () => import('../pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'setting',
        loadChildren: () => import('../pages/setting/setting.module').then(m => m.SettingModule)
      },
      {
        path: 'favorities',
        loadChildren: () => import('../pages/favoritos/favorities.module').then(m => m.FavoritiesModule)
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
