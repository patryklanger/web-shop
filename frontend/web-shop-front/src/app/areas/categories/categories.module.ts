import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoriesRoutingModule } from './cateogires-routing.module';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    CategoryCardComponent,
    CategoryListComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule {}
