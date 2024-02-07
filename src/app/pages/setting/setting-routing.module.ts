import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SettingComponent} from "./setting.component";
import {SettingHomeComponent} from "./containers/setting-home.component";

const routes: Routes = [
  {
    path: '',
    component: SettingComponent,
    children: [
      {
        path: '',
        component: SettingHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
