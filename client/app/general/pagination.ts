export class Pagination {

    static MAX_RANGE = 5;

    current:number;
    total:number;
    items:PaginationItem[] = null;

    public static toItems(value:Pagination):PaginationItem[] {
      console.log("Pagination.items");

      let halfRange = Math.ceil(0.5 * Pagination.MAX_RANGE);
      var bottom:number;
      var top:number;

      var pagenationItems:PaginationItem[] = [];
      var current = value.current;

      if(current < halfRange) {
          bottom = 1;
          top = Pagination.MAX_RANGE;
      } else {
          bottom = current - halfRange;
          top = current + halfRange;
      }
      bottom = Math.max(1, bottom);
      top = Math.min(value.total, top);

      for (var i:number = bottom; i <= top; i++) {
          pagenationItems.push(new PaginationItem(i, i == current))
      }

      return pagenationItems;
    }
}
export class PaginationItem {

    page:number;
    selected:Boolean;

    constructor(page:number, selected:Boolean) {
        this.page = page;
        this.selected = selected;
    }

}
