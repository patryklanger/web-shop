import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";

import * as AppActions from "./app.actions";

export interface AppStateModel {
  menuState: boolean;
}

@State<AppStateModel>({
  name: "app",
  defaults: {
    menuState: false
  }
})
@Injectable()
export class AppState {
  @Selector()
  static menuState(state: AppStateModel): boolean {
    return state.menuState
  }

  @Action(AppActions.MenuToggle)
  toggleMenu({ patchState, getState }: StateContext<AppStateModel>) {
    const currentState = getState().menuState;
    patchState({ menuState: !currentState })
  }
}
