import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, switchMap, takeUntil, tap, Observable } from 'rxjs';
import { PaginatedResult } from 'src/app/core/models/paginatedResult.model';

import { UserGatewayService } from '../../../../core/gateways/user/user-gateway.service';
import { User } from '../../../../core/models/user/user.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserTableComponent implements OnDestroy, OnInit {
  users: User[]
  loadMoreAvailable = false;

  private readonly currentPage$ = new BehaviorSubject(0);

  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'email', 'enabled'];

  private readonly _destroy$ = new Subject<void>();

  constructor(private userGatewayService: UserGatewayService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.currentPage$.pipe(
      switchMap(currentPage => this.getNextPage$(currentPage)),
      tap(() => this.cdr.markForCheck()),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  loadMore() {
    this.currentPage$.next(this.currentPage$.getValue() + 1)
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete()
  }

  private getNextPage$(page: number): Observable<PaginatedResult<User>> {
    return this.userGatewayService.getUsers$(page).pipe(
      tap(users => {
        if (!this.users) {
          this.users = []
        }

        this.users = [...this.users, ...users.results]
      }),
      tap(users => this.loadMoreAvailable = users.startElement + users.count < users.totalCount)
    )
  }

  onUserChange(user: User) {
    this.users.map(u => {
      if (u.id === user.id) {
        return user;
      }
      return u
    })
    this.cdr.markForCheck();
  }

}
