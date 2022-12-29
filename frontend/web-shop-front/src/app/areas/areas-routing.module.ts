import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", redirectTo: "products" },
  { path: "admin", loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: "products", loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: "categories", loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
  { path: "cart", loadChildren: () => import("./cart/cart.module").then(m => m.CartModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AreasRoutingModule {}
