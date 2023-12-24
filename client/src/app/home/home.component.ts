import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../models/user';
import { RecycledItem } from '../models/recycled-item';
import { RecycledItemService } from '../services/recycled-item.service';
import { tap } from 'rxjs';
import { GarbageType } from '../models/enums/garbage-type';
import { MatDialog } from '@angular/material/dialog';
import { RecycledItemDetailModalComponent } from '../shared/recycled-item-detail-modal/recycled-item-detail-modal.component';

@Component({
  selector: 'recycle-bud-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  loggedUser: User | null = this.authService.getLoggedUser()

  recycledItems: RecycledItem[] = []
  recycledItems$ = this.recycledItemService.findMany({
    where: {
      user: {
        email: this.loggedUser?.email
      }
    }
  }).pipe(tap(items => {
    this.recycledItems = items
    this.sortedItems = this.sortItems(items)
  }))

  sortedItems: { type: string, items: RecycledItem[], total: number }[] = []

  constructor(
    private authService: AuthService,
    private recycledItemService: RecycledItemService,
    private dialog: MatDialog
  ) {

  }

  ngOnInit(): void {
    this.recycledItems$.subscribe()
  }

  sortItems(items: RecycledItem[]): { type: string, items: RecycledItem[], total: number }[] {
    let output = []
    for (let type in GarbageType) {
      let obj = {
        type: type,
        items: items.filter(item => item.type === type),
        total: this.countTotal(items.filter(item => item.type === type))
      }
      output.push(obj)
    }
    console.log('sortedItems', output);

    return output
  }

  countTotal(items: RecycledItem[]) {
    if (items.length > 0)
      return items.map(item => item.quantity).reduce((accumulator, item) => accumulator + item)
    else
      return 0
  }


  openAddModal() {
    this.dialog.open(RecycledItemDetailModalComponent)
  }
}
