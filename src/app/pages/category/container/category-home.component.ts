import { Component, OnInit } from '@angular/core';
import {NgbCalendar, NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {HistoryByCategoryComponent} from "../components/history-by-category/history-by-category.component";
import {Router} from "@angular/router";
import {CategoryService} from "../../../services/category.service";
import {GeneralService} from "../../../services/general.service";
import {END_POINTS} from "../../../services/utils/end-points";

@Component({
  selector: 'app-category-home',
  templateUrl: './category-home.component.html',
  styleUrls: ['./category-home.component.scss'],
})
export class CategoryHomeComponent  implements OnInit {
  component = HistoryByCategoryComponent
  data: any = [];
  constructor(private router: Router,
              private categoryService: CategoryService,
              private generalService: GeneralService) { }

  ngOnInit() {
    this.getCategory();

  }

  handleRefresh(event: any) {
    setTimeout(() => {
      // Any calls to load data go here
      this.getCategory();
      event.target.complete();
    }, 2000);
  };
  routeNavigate(id: any) {
    this.router.navigate(['pages/category/category-details', id]);
  }

  getCategory() {
    const serviceName = END_POINTS.base_back.category;
    this.generalService.nameAll$(serviceName).subscribe((res: any) => {
      console.log(res);
      this.data = res.data
    })
  }

}
