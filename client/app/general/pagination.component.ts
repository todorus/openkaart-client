import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Pagination, PaginationItem} from "./pagination";

@Component({
    selector: 'pagination',
    templateUrl: 'app/general/pagination.html',
    styles: [`
        p, input {
            margin: 0;
        }

        ul {
            display: flex;
            justify-content: center;
        }
        ul li {
            display: inline-block;
            cursor: pointer;

            width: auto;
            min-width: 38px;

            border: solid 1px #CED1D2;

            text-align: center;
        }
        ul li:hover {
            color: #FFF;
            border: 1px solid #35886F;
            background: #43AA8B;
        }
        ul li.selected, ul li.selected:hover {
            background: #2D755F;
            border: solid 1px #FFF;
            color: #FFF;

            cursor: default;
        }
    `]
})
export class PaginationComponent {

    private items: any[] = null;

    _pages:Pagination = null;

    @Input("pages")
    set pages(value: Pagination){
      if(value != null){
        this.items = Pagination.toItems(value);
      }
    }
    // pages:Pagination = null;

    @Output("page")
    page:EventEmitter<number> = new EventEmitter();

    select(item:PaginationItem):void {
        this.page.next(item.page);
    }

}
