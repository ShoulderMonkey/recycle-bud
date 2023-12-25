import { AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

export class DatatableColumn<T> {
  name!: string;
  title?: Observable<string>;
  type?: 'text' | 'link' | 'icon' | 'templateRef' = 'text';
  flex?: string;
  sticky?: boolean;
  color?: (element: T) => 'primary' | 'warn' | 'error';
  cssClass?: (element: T) => string[];
  sortDisabled?: boolean;
  routerLink?: (element: T) => string[];
  value(element: T): any {
    return null;
  };
  sort?: (element: T) => any
  templateRef?: (element: T) => Observable<TemplateRef<any>>;
  tooltip?: (element: T) => Observable<String>;

  constructor(column: Partial<DatatableColumn<T>>) {
    Object.assign(this, column);
  }
}

export class DatatableAction<T> {
  label?: Observable<string>;
  color?: string;
  icon(element: T): string {
    return ''
  };
  iconButton?: boolean = true;
  spinner?: boolean;
  disabled?(element: T): boolean {
    return false
  }

  constructor(action: Partial<DatatableAction<T>>) {
    Object.assign(this, action);
  }

  onClick(element: T): void { }
}

@Component({
  selector: 'recycle-bud-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges, AfterViewInit, AfterViewChecked {

  @Input() isActionsSticky : boolean = false
  @Input() data!: any[];
  @Input() createButtonTemplate?: TemplateRef<any>;
  @Input() columns!: DatatableColumn<any>[];
  @Input() displayedColumns: string[] = [];
  @Input() actions: DatatableAction<any>[] = [];
  @Input() sortActive = 'id';
  @Input() sortDirection: SortDirection = 'asc';
  @Input() hasPagination = true;
  @Input() hasHeader = true;
  @Input() pageSize = 10;
  @Input() pageSizeOptions = [10, 20, 30];
  @Input() selected: any;
  @Input() dynamicColWidth?: boolean;
  @Output() rowSelected = new EventEmitter<any>();
  @Output() selectionChanged = new EventEmitter();

  input = new Subject<string>();
  inputValue$ = this.input.pipe(debounceTime(200), distinctUntilChanged());
  disableSearch: boolean = false;
  dataSourcefiltered? : any
  dataSourceInput? : any

  @ViewChild(MatSort) set matSort(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator | null;

  dataSource = new MatTableDataSource<any>()
  hoverRow: any;

  constructor()
  {

   }

  ngOnInit(): void {

    //this.dataSource.sort = this.sort;

    this.dataSource.sortingDataAccessor = (item, property) => {
      let column = this.columns.find(column => column.name === property)
      if(column && column.sort !== undefined){
        return column.sort(item)
      }else if(column){
        return column.value(item)
      }else{
        return null
      }
    };
     this.dataSource.sort = this.matSort;

    if (this.actions.length > 0 && !this.displayedColumns.includes('actions')) {
      this.displayedColumns.unshift('actions');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

  }

  ngAfterViewChecked(): void {
    this.dynamicColWidth?
      this.adjustColumns():null
  }

  ngAfterContentChecked() {
    this.inputValue$.pipe(switchMap((input: any)=> {
      const filterValue = (input.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      this.dataSource.paginator = this.paginator;
      console.log("FILTERED DATA -> ", this.dataSource.filteredData)
      // this.dataSource.sort = this.sort;
      console.log(input)

      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      return '';
    })).subscribe()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && changes['data'].currentValue !== changes['data'].previousValue) {
      this.dataSource.data = changes['data'].currentValue
      // this.adjustColumns()
    }
    if (this.actions.length > 0 && !this.displayedColumns.includes('actions')) {
      this.displayedColumns.unshift('actions');
      // this.adjustColumns()
    }

  }


  selectRow(row: any) {
    this.rowSelected.next(row);
  }

  onMatRowHover(event: any, row: any) {
    if (event.leave) {
      this.hoverRow = null;
    } else {
      this.hoverRow = row;
    }
  }

  onSelectionChange(event: any, element: any) {
    this.selectionChanged.next({ event: event, element: element })
  }



  updateList(e: any) {
    // console.log("EVENTO LISTA -->", e)
    if (e?.length > 0) {
      this.data = e;
    } else {
      this.data = this.dataSourcefiltered
    }
  }

  applyFilter(event: any) {
    this.input.next(event)
  }

  clearSearch() {
    this.input.next('');
  }

  adjustColumns() {
    // console.log('adjusting columns fired');
    let columns: any = [];
    Object.assign(columns, this.columns);
    columns.push({
      name: 'actions',
    });
    let summarize = 0;
    for (let icol = 0; icol < columns.length; icol++) {
      const cells = Array.from(document.getElementsByClassName('column-data')).filter((cell) =>
        cell.classList.contains('mat-column-' + columns[icol].name)
      );
      for (let icel = 0; icel < cells.length; icel++) {
        const element = cells[icel] as HTMLElement; // Cast the element to HTMLElement
        try {
          summarize = summarize + element!.scrollWidth;
        } catch (error) {}
      }
    }
    let bd = document.getElementById('dt-child')?.getBoundingClientRect()?.width;
    if (bd == null) bd = 0;
    if (summarize === 0) summarize = 10;
    const projection = bd / summarize; //

    // console.log('[mat-table]projection width %o actual %o total %o', projection, bd, summarize);
    for (let icol = 0; icol < columns.length; icol++) {
      const cells = Array.from(document.getElementsByClassName('column-data')).filter((cell) =>
        cell.classList.contains('mat-column-' + columns[icol].name)
      );
      if (cells.length > 1) {
        let maxWidth = 0;
        for (let icel = 0; icel < cells.length; icel++) {
          try {
            const element = cells[icel].classList.contains('cdk-header-cell')
              ? (cells[icel].lastElementChild as HTMLElement).scrollWidth + 20
              : (cells[icel] as HTMLElement).scrollWidth; // Cast the element to HTMLElement
            maxWidth = Math.max(maxWidth, element);
            //console.log('col.name %o col.width %o', columns[icol].name, element.lastElementChild!.scrollWidth);
          } catch (error) {}
        }
        //  if(maxWidth > 500)
        //  maxWidth = 500;
        // Set the maximum width as the width for all cells in the column

        for (let icel = 0; icel < cells.length; icel++) {
          const element = cells[icel] as HTMLElement; // Cast the element to HTMLElement
          if (projection > 1) maxWidth = maxWidth * projection;
          if (maxWidth > 800)
            console.log('projection %o', {
              proj: projection,
              maxWidth: maxWidth,
              scrollwidth: (cells[icel] as HTMLElement).scrollWidth,
              colName: cells[icel],
            });
          element.style.width = `${maxWidth}px`;
        }
      }
    }
  }

}
