import { Component } from '@angular/core';
import { DatatableAction, DatatableColumn } from '../../shared/data-table/data-table.component';
import { RecycledItem } from '../../models/recycled-item';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RecycledItemDetailModalComponent } from '../../shared/recycled-item-detail-modal/recycled-item-detail-modal.component';
import { RecycledItemService } from '../../services/recycled-item.service';
import { AuthService } from '../../auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'recycle-bud-recycled-items-list',
  templateUrl: './recycled-items-list.component.html',
  styleUrl: './recycled-items-list.component.scss'
})
export class RecycledItemsListComponent {
  
  dataSource: RecycledItem[] = []

  displayedColumns = ['id', 'type', 'description', 'quantity']
  columns: DatatableColumn<RecycledItem>[]=[
    {
      name: 'id',
      title: this.translate.get('RecycledItem.Fields.Id'),
      value: item => item.id
    },
    {
      name: 'type',
      title: this.translate.get('RecycledItem.Fields.Type'),
      value: item => item.type
    },
    {
      name: 'description',
      title: this.translate.get('RecycledItem.Fields.Description'),
      value: item => item.description
    },
    {
      name: 'quantity',
      title: this.translate.get('RecycledItem.Fields.Quantity'),
      value: item => item.quantity
    }
  ]
  
  actions: DatatableAction<RecycledItem>[] = [
    {
      label: of(''),
      onClick: item => this.openDetail(item),
      color: 'primary',
      icon: profile =>  {
          return 'edit'
      }
    },
    {
      label: of(''),
      onClick: item => this.delete(item),
      color: 'primary',
      icon: profile =>  {
          return 'delete'
      }
    }
  ]

  constructor(
    private translate: TranslateService,
    private dialog: MatDialog,
    private recycledItemService: RecycledItemService,
    private authService: AuthService
  ){
    this.loadDatasource()
  }

  loadDatasource(){
    this.recycledItemService.findMany({
      where: {
        user: {
          email: this.authService.getLoggedUser()!.email
        }
      }
    }).subscribe({
      next: (items => {
        this.dataSource = items
      })
    })
  }

  openDetail(item?: RecycledItem){
    this.dialog.open(RecycledItemDetailModalComponent, {data: item}).afterClosed().subscribe({
      next: (res => {
        if(res && res.saved){
          this.loadDatasource()
        }
      })
    })
  }

  delete(item:RecycledItem){
    this.recycledItemService.deleteOne(item.id.toString()).subscribe({
      next: (res => {
        this.loadDatasource()
      })
    })
  }
}
