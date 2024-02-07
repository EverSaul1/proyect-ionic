import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-scaffolt',
  templateUrl: './scaffolt.component.html',
  styleUrls: ['./scaffolt.component.scss'],
})
export class ScaffoltComponent  implements OnInit {
  showTab: boolean = true;
  selectedTab: string = '';

  constructor(private route: Router) {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = this.route.url;
        this.showTab = (!url.includes('history'));
      }
    });

  }

  ngOnInit() {}

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

}
