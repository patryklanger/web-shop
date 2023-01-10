import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DrawerComponent } from './drawer/drawer.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { RouterModule } from '@angular/router';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  declarations: [
    NavBarComponent,
    DrawerComponent,
    SideMenuComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule,
    MatBadgeModule,
    MatPaginatorModule

  ],
  exports: [NavBarComponent, DrawerComponent, PaginatorComponent]

})
export class SharedModule {}
