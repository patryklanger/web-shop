import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AbstractGatewayService } from '../abstract-gateway.service';
import { Observable } from 'rxjs';
import { Order } from '../../models/order/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderGatewayService extends AbstractGatewayService {

  createOrder$(order: Order): Observable<Order> {
    return this.post$("", order)
  }

  protected getBaseUrl(): string {
    return `${environment.apiEndpoint}/${this.getResourceName()}`
  }

  protected getResourceName(): string {
    return 'orders';
  }
}
