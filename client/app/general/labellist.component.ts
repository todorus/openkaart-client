import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from "./pagination";

@Component({
  selector: 'labellist',
  templateUrl: 'app/general/labellist.html',
  styleUrls: ['app/general/labellist.css']
})
export class LabelListComponent implements OnInit {

  @Input("loading")
  loading:boolean = false;

  @Input("data")
  data :Array<any>;

  @Input("pages")
  pages :Pagination;

  @Output("selected")
  selected:EventEmitter<any> = new EventEmitter();

  constructor() {}
  ngOnInit() {}

  @Output("page")
  page:EventEmitter<number> = new EventEmitter();

  onPage(page:number):void {
      this.page.next(page);
  }

  private select(entry:any) {
      this.selected.next(entry);
  }

}
