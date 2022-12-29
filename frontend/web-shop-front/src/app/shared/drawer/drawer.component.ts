import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, takeUntil, tap } from 'rxjs';
import { AppState } from 'src/app/core/state/app';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, OnDestroy {

  menuState = false;

  private readonly _destroy$ = new Subject<void>()

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(AppState.menuState).pipe(
      tap(state => this.menuState = state),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  ngOnDestroy() {
    this._destroy$.next()
    this._destroy$.complete()
  }

}
