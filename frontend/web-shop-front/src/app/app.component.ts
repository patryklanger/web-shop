import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';

import { UserActions } from './core/state/user';
import { AppState, AppActions } from 'src/app/core/state/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'web-shop-front';

  drawerOpened = true;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(new UserActions.Restore)
    this.store.dispatch(new AppActions.RestoreCart)
  }
}
