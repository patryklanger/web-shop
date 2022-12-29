import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, tap, takeUntil, filter } from 'rxjs';
import { AppActions } from 'src/app/core/state/app';
import { UserState, UserActions } from 'src/app/core/state/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  private _destroy$ = new Subject<void>();

  userName: string | null = null
  isLoggedIn: boolean = false;

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.store.select(UserState.state).pipe(
      tap(state => this.isLoggedIn = !!state.accessToken),
      tap(state => this.userName = state.username!),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  toggleMenu() {
    this.store.dispatch(new AppActions.MenuToggle())
  }

  onLoginClick() {
    this.router.navigateByUrl("auth");
  }

  onLogoutClick() {
    this.store.dispatch(new UserActions.Logout());
  }


}
