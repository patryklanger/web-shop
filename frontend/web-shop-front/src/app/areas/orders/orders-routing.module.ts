import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OrderFormComponent } from "./order-form/order-form.component";
import { PlaceOrderGuard } from "./place-order.guard";

const routes: Routes = [
  { path: "new", component: OrderFormComponent, canActivate: [PlaceOrderGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
