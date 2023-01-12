import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OrderGatewayService } from 'src/app/core/gateways/order/order-gateway.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { SuccessOrderDialogData } from './success-order-dialog-data.model';
import { Router } from '@angular/router';
import { Subject, tap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-success-order-dialog',
  templateUrl: './success-order-dialog.component.html',
  styleUrls: ['./success-order-dialog.component.scss']
})
export class SuccessOrderDialogComponent implements OnDestroy {

  private readonly _destroy$ = new Subject<void>();

  constructor(public dialogRef: MatDialogRef<SuccessOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SuccessOrderDialogData,
    private orderGateway: OrderGatewayService,
    private notificationService: NotificationService) {}

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  pay() {
    this.orderGateway.payOrder$(this.data.id).pipe(
      tap(() => this.dialogRef.close()),
      tap(() => this.notificationService.showSuccessNotification("Payment successful")),
      takeUntil(this._destroy$)
    ).subscribe();
  }

}
