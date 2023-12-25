import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap, of } from 'rxjs';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { DatatableColumn, DatatableAction } from '../../shared/data-table/data-table.component';

@Component({
  selector: 'recycle-bud-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  dataSource: User[] = []

  users$ = this.userService.getAll().pipe(
    tap(users => {
      this.dataSource = users
    })
  )

  displayedColumns = ['email', 'firstname', 'lastname', 'isActive']
  columns: DatatableColumn<User>[] = [
    {
      name: 'email',
      title: of('Email'),
      value: item => item.email
    },
    {
      name: 'firstname',
      title: of('Firstname'),
      value: item => item.firstname
    },
    {
      name: 'lastname',
      title: of('Lastname'),
      value: item => item.lastname
    },
    {
      name: 'isActive',
      title: of('Active'),
      type: 'icon',
      value: item => item.isActive ? 'check' : 'cancel'
    }
  ]

  actions: DatatableAction<User>[] = [
    {
      label: of(''),
      onClick: item => this.openDetail(item),
      color: 'primary',
      icon: profile => {
        return 'edit'
      }
    },
    {
      label: of(''),
      onClick: item => this.delete(item),
      color: 'primary',
      icon: profile => {
        return 'delete'
      }
    }
  ]

  constructor(
    private userService: UserService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.users$.subscribe()
  }

  openDetail(user: User){
    this.router.navigate(['/user', user.email])
  }

  openNew(){
    this.router.navigate([`/user/new`])
  }

  delete(user: User){
    this.userService.deleteOne(user.email).subscribe({
      next: (res => {
        this.ngOnInit()
      })
    })
  }
}
