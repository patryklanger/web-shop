import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { UserState } from 'src/app/core/state/user';
import { AppActions } from 'src/app/core/state/app';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponent implements OnInit, OnDestroy {
  isAdmin: boolean;
  isLoggedIn: boolean;

  private readonly _destroy$ = new Subject<void>()

  constructor(private store: Store, private cdr: ChangeDetectorRef) {}

  toggleMenu() {
    this.store.dispatch(new AppActions.MenuToggle())
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit() {
    this.store.select(UserState.roles).pipe(
      tap(roles => this.isAdmin = roles?.includes("admin")),
      tap(() => this.cdr.markForCheck()),
      takeUntil(this._destroy$)
    ).subscribe()

    this.store.select(UserState.isLoggedIn).pipe(
      tap(isLoggedIn => this.isLoggedIn = isLoggedIn),
      takeUntil(this._destroy$)
    ).subscribe()
  }


}
