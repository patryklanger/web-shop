import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';

const routes: Routes = [
  { path: "", redirectTo: "products" },
  { path: "admin", loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [AdminGuard] },
  { path: "products", loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: "categories", loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: "cart", loadChildren: () => import("./cart/cart.module").then(m => m.CartModule) },
  { path: "orders", loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreasRoutingModule {}
