import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserTableComponent } from './user-table/user-table.component';
import { UsersRoutingModule } from './users-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../shared/shared.module';



@NgModule({
  declarations: [
    UserTableComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    MatButtonModule,
    SharedModule
  ]
})
export class UsersModule {}
