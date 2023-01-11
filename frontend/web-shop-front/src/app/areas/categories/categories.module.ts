import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryCardComponent } from './category-card/category-card.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoriesRoutingModule } from './cateogires-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { AddCategoryComponent } from './add-category/add-category.component';
import { MatIconModule } from '@angular/material/icon';
import { EditCategoryComponent } from './edit-category/edit-category.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    CategoryCardComponent,
    CategoryListComponent,
    CategoryFormComponent,
    AddCategoryComponent,
    EditCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
  ]
})
export class CategoriesModule {}
