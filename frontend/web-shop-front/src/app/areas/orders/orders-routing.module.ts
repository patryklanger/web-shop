import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AdminGuard } from "src/app/shared/guards/admin.guard";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { OrderFormComponent } from "./order-form/order-form.component";
import { OrderTableComponent } from "./order-table/order-table.component";
import { PlaceOrderGuard } from "./place-order.guard";

const routes: Routes = [
  { path: "", redirectTo: "all" },
  { path: "new", component: OrderFormComponent, canActivate: [PlaceOrderGuard] },
  { path: "all", component: OrderTableComponent, canActivate: [AdminGuard] },
  { path: "details/:id", component: OrderDetailsComponent, canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
