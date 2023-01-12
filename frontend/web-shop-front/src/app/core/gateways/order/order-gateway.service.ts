import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AbstractGatewayService } from '../abstract-gateway.service';
import { Observable } from 'rxjs';
import { Order } from '../../models/order/order.model';
import { PaginatedResult } from 'src/app/core/models/paginatedResult.model';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { OrderState } from '../../models/order/order-state.enum';

@Injectable({
  providedIn: 'root'
})
export class OrderGatewayService extends AbstractGatewayService {

  createOrder$(order: Order): Observable<Order> {
    return this.post$("", order)
  }

  getOrders$(page = 0, limit = 10): Observable<PaginatedResult<Order>> {
    const params = new HttpParams({
      fromObject: {
        page: page,
        limit: limit
      }
    })
    return this.get$("", params);
  }

  getOrder$(id: number): Observable<Order> {
    return this.get$(`${id}`);
  }

  payOrder$(id: number): Observable<Order> {
    return this.post$(`${id}/pay`)
  }

  changeOrderState$(id: number, state: OrderState): Observable<Order> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })
    const body = {
      state: state
    }
    return this.post$(`${id}`, body, headers);
  }

  protected getBaseUrl(): string {
    return `${environment.apiEndpoint}/${this.getResourceName()}`
  }

  protected getResourceName(): string {
    return 'orders';
  }
}
