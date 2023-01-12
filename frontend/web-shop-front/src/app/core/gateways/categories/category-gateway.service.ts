import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AbstractGatewayService } from '../abstract-gateway.service';
import { Observable } from 'rxjs';
import { PaginatedResult } from 'src/app/core/models/paginatedResult.model';
import { Category, CategoryShort } from '../../models/product/category.model';
import { HttpParams } from '@angular/common/http';
import { CategoryFormData } from 'src/app/areas/categories/category-form/category.form-data.model';
import { ImageGatewayService } from '../abstract-image.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryGatewayService extends AbstractGatewayService implements ImageGatewayService<Category>{

  uploadImage$(image: File, objectId: number): Observable<Category> {
    const formData = new FormData();
    formData.append("image", image);
    return this.post$(`${objectId}/image`, formData);
  }

  getCategories$(page = 0, limit = 10): Observable<PaginatedResult<Category>> {
    const params = new HttpParams({
      fromObject: {
        page: page,
        limit: limit
      }
    })
    return this.get$("", params)
  }

  createCategory$(data: CategoryFormData): Observable<Category> {
    return this.post$("", data)
  }

  editCategory$(id: number, data: CategoryFormData) {
    return this.put$(`${id}`, data)
  }

  deleteCategory$(categoryId: number): Observable<unknown> {
    return this.delete$(`${categoryId}`)
  }

  getCategoriesShort$(): Observable<CategoryShort[]> {
    return this.get$("short")
  }

  getCategory$(id: number): Observable<Category> {
    return this.get$(`${id}`);
  }

  protected getBaseUrl(): string {
    return `${environment.apiEndpoint}/${this.getResourceName()}`
  }
  protected getResourceName(): string {
    return 'products/category';
  }


}
