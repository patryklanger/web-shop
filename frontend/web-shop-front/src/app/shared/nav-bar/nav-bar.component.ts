import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, tap, takeUntil, filter } from 'rxjs';
import { AppActions, AppState } from 'src/app/core/state/app';
import { UserState, UserActions } from 'src/app/core/state/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit, OnDestroy {
  itemsAmount = 0;
  cartValue = 0;

  private _destroy$ = new Subject<void>();

  userName: string | null = null
  isLoggedIn: boolean = false;

  constructor(private store: Store, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.store.select(UserState.state).pipe(
      tap(state => this.isLoggedIn = !!state.accessToken),
      tap(state => this.userName = state.username!),
      tap(() => this.cdr.markForCheck()),
      takeUntil(this._destroy$)
    ).subscribe()

    this.store.select(AppState.cartItemsAmount).pipe(
      tap(amount => this.itemsAmount = amount),
      tap(() => this.cdr.markForCheck()),
      takeUntil(this._destroy$)
    ).subscribe()

    this.store.select(AppState.cartItemsValue).pipe(
      tap(value => this.cartValue = value),
      tap(() => this.cdr.markForCheck()),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onCartButtonClick() {
    this.router.navigateByUrl('cart');
  }

  emptyCart() {
    this.store.dispatch(new AppActions.EmptyCart());
  }

  toggleMenu() {
    this.store.dispatch(new AppActions.MenuToggle())
  }

  onLoginClick() {
    this.router.navigateByUrl("auth");
  }

  onLogoutClick() {
    this.store.dispatch(new UserActions.Logout()).pipe(
      tap(() => this.cdr.markForCheck()),
      takeUntil(this._destroy$)
    ).subscribe()
  }


}
