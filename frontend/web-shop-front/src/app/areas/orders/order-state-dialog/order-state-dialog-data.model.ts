import { Subject } from 'rxjs';
import { Order } from 'src/app/core/models/order/order.model';
import { OrderState } from 'src/app/core/state/order';
import { OrderGatewayService } from 'src/app/core/gateways/order/order-gateway.service';

export interface OrderStateDialogData {
  id: number,
  currentState: OrderState,
  orderChanged$: Subject<Order>,
  service: OrderGatewayService

}
