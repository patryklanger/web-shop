import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from "@ngxs/devtools-plugin";

import { UserState } from './state/user';
import { SharedModule } from '../shared/shared.module';
import { AppState } from './state/app';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    NgxsModule.forRoot([UserState, AppState]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
  ]
})
export class CoreModule {}
