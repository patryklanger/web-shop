import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, map, ReplaySubject, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Order } from 'src/app/core/models/order/order.model';
import { ActivatedRoute } from '@angular/router';
import { OrderGatewayService } from 'src/app/core/gateways/order/order-gateway.service';
import { User } from '../../../core/models/user/user.model';
import { UserGatewayService } from 'src/app/core/gateways/user/user-gateway.service';
import { ProductGatewayService } from 'src/app/core/gateways/products/product-gateway.service';
import { OrderBasketElement } from 'src/app/core/models/order/order-basket-element.model';
import { Product } from 'src/app/core/models/product/product.model';
import { MatDialog } from '@angular/material/dialog';
import { OrderStateDialogComponent } from '../order-state-dialog/order-state-dialog.component';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  order: Order;
  user: string;
  products: Product[];

  private readonly orderChanged$ = new ReplaySubject<Order>();
  private readonly userId$ = new ReplaySubject<string>();
  private readonly basket$ = new ReplaySubject<OrderBasketElement[]>();
  private readonly _destroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, private orderGateway: OrderGatewayService, private userGateway: UserGatewayService, private productGateway: ProductGatewayService, public dialog: MatDialog) {}

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      map((paramMap) => +paramMap.get("id")),
      filter((id) => !!id),
      switchMap(id => this.orderGateway.getOrder$(id)),
      tap(order => this.order = order),
      tap(order => this.userId$.next(order.userId)),
      tap(order => this.basket$.next(order.basket)),
      takeUntil(this._destroy$)
    ).subscribe()

    this.userId$.pipe(
      tap((id) => {
        if (id === "anonymousUser") {
          this.user = id;
        }
      }),
      filter(id => id !== "anonymousUser"),
      switchMap((id) => this.userGateway.getUser$(id)),
      tap(user => this.user = user.username),
      takeUntil(this._destroy$)
    ).subscribe()

    this.basket$.pipe(
      map(basket => basket.map(e => e.productId)),
      switchMap(list => this.productGateway.getProductOrderList$(list)),
      tap(products => this.products = products),
      takeUntil(this._destroy$)
    ).subscribe()

    this.orderChanged$.pipe(
      tap(order => this.order = order),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  openEditStateDialog() {
    this.dialog.open(OrderStateDialogComponent, {
      data: { id: this.order.id, service: this.orderGateway, orderChanged$: this.orderChanged$, currentState: this.order.orderState },
    });
  }

  getProduct(id: number): Product {
    return this.products.find(p => p.id === id);
  }
  getApartmentNumber() {
    return this.order.apartmentNumber ? `/${this.order.apartmentNumber}` : ""
  }
  getTotalPrice() {
    return this.order.basket.reduce((acc, cur) => acc + cur.amount * cur.price, 0)
  }

  getBasketElement(product: Product) {
    return this.order.basket.find(e => e.productId === product.id);
  }

  ngOnDestroy() {
    this.userId$.complete();

    this._destroy$.next();
    this._destroy$.complete();
  }

}
