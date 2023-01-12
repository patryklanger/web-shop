import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user-table/user-table.component';
import { UsersRoutingModule } from './users-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../shared/shared.module';
import { ToggleAdminComponent } from './toggle-admin/toggle-admin.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserTableComponent,
    ToggleAdminComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    MatTableModule,
    MatButtonModule,
    SharedModule,
    MatSlideToggleModule
  ]
})
export class UsersModule {}
