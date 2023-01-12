import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { OrderGatewayService } from 'src/app/core/gateways/order/order-gateway.service';
import { Order } from 'src/app/core/models/order/order.model';
import { PaginatedResult } from 'src/app/core/models/paginatedResult.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderTableComponent implements OnInit, OnDestroy {
  orders: Order[]
  loadMoreAvailable = false;

  displayedColumns: string[] = ['id', 'userId', 'orderState', 'paid', 'country', 'createdAt', "totalPrice"];

  private readonly currentPage$ = new BehaviorSubject(0);
  private readonly _destroy$ = new Subject<void>();

  constructor(private orderGateway: OrderGatewayService, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    this.currentPage$.pipe(
      switchMap(currentPage => this.getNextPage$(currentPage)),
      tap(() => this.cdr.markForCheck()),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete()
  }

  loadMore() {
    this.currentPage$.next(this.currentPage$.getValue() + 1)
  }

  getTotalPrice(order: Order) {
    return order.basket.reduce((acc, cur) => acc + cur.amount * cur.price, 0)
  }

  getNextPage$(page: number): Observable<PaginatedResult<Order>> {
    return this.orderGateway.getOrders$(page).pipe(
      tap(orders => {
        if (!this.orders) {
          this.orders = []
        }

        this.orders = [...this.orders, ...orders.results]
      }),
      tap(orders => this.loadMoreAvailable = orders.startElement + orders.count < orders.totalCount)
    )
  }

  goToDetails(event: any) {
    this.router.navigateByUrl(`/orders/details/${event.id}`)
  }

}
