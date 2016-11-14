import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'labellist',
  templateUrl: 'app/general/labellist.html',
  styleUrls: ['app/general/labellist.css']
})
export class LabelListComponent implements OnInit {

  @Input("data")
  data :Array<any>;

  @Output("selected")
  selected:EventEmitter<any> = new EventEmitter();

  constructor() {}
  ngOnInit() {}

  private select(entry:any) {
      this.selected.next(entry);
  }
}
