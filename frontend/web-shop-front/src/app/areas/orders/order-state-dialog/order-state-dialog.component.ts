import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Order } from 'src/app/core/models/order/order.model';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { OrderStateDialogData } from './order-state-dialog-data.model';
import { OrderGatewayService } from 'src/app/core/gateways/order/order-gateway.service';
import { FormControl } from '@angular/forms';
import { OrderState } from 'src/app/core/models/order/order-state.enum';
import { Subject, tap } from 'rxjs';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-order-state-dialog',
  templateUrl: './order-state-dialog.component.html',
  styleUrls: ['./order-state-dialog.component.scss']
})
export class OrderStateDialogComponent implements OnInit, OnDestroy {
  @Input() order: Order;
  stateCtrl = new FormControl(null)
  readonly orderStates = OrderState;

  private readonly _destroy$ = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<OrderStateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: OrderStateDialogData,
    private orderGateway: OrderGatewayService,
    private notificationService: NotificationService) {}

  ngOnInit() {
    this.stateCtrl.setValue(this.data.currentState);
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSubmit() {
    this.orderGateway.changeOrderState$(this.data.id, this.stateCtrl.value as OrderState).pipe(
      tap(order => this.data.orderChanged$.next(order)),
      tap(() => this.notificationService.showSuccessNotification("State changed")),
      tap(() => this.dialogRef.close()),
      takeUntil(this._destroy$)
    ).subscribe();
  }

}
