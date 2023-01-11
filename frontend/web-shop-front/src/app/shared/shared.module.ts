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
import { ValidationErrorDirective } from './validation-error.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UploadImageDialogComponent } from './upload-image-dialog/upload-image-dialog.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddTagsDialogComponent } from './add-tags-dialog/add-tags-dialog.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    NavBarComponent,
    DrawerComponent,
    SideMenuComponent,
    PaginatorComponent,
    ValidationErrorDirective,
    LoadingSpinnerComponent,
    UploadImageDialogComponent,
    AddTagsDialogComponent
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
    MatPaginatorModule,
    MatProgressSpinnerModule,
    FileUploadModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule

  ],
  exports: [NavBarComponent, DrawerComponent, PaginatorComponent, ValidationErrorDirective, LoadingSpinnerComponent]

})
export class SharedModule {}
