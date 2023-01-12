import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderFormComponent } from './order-form/order-form.component';
import { ConfirmOrderComponent } from './confirm-order/confirm-order.component';
import { PayOrderComponent } from './pay-order/pay-order.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderTableComponent } from './order-table/order-table.component';
import { MatTableModule } from '@angular/material/table';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';



@NgModule({
  declarations: [
    OrderFormComponent,
    ConfirmOrderComponent,
    PayOrderComponent,
    OrderTableComponent,
    OrderDetailsComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    SharedModule,
    OrdersRoutingModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule,
    MatListModule
  ]
})
export class OrdersModule {}
