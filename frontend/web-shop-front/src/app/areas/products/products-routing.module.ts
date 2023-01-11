import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { AdminGuard } from 'src/app/shared/guards/admin.guard';

const routes: Routes = [
  { path: "", component: ProductListComponent },
  { path: "add", component: AddProductComponent, canActivate: [AdminGuard] },
  { path: "details/:id", component: ProductDetailsComponent, pathMatch: "full" },
  { path: "edit/:id", component: EditProductComponent, pathMatch: "full", canActivate: [AdminGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
