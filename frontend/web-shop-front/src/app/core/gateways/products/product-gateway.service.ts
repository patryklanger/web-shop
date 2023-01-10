import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { PaginatedResult } from '../../models/paginatedResult.model';
import { Product, ProductFormData } from '../../models/product/product.model';
import { AbstractGatewayService, BodyParams } from '../abstract-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class ProductGatewayService extends AbstractGatewayService {

  getProducts$(page = 0, limit = 10, categoryId?: string): Observable<PaginatedResult<Product>> {
    let params = new HttpParams({
      fromObject: {
        page: page,
        limit: limit
      }
    })
    if (categoryId) {
      params = params.set("categoryId", categoryId);
    }
    return this.get$("product", params)
  }
  getProduct$(id: number): Observable<Product> {
    return this.get$(`product/${id}`)
  }

  editProduct$(id: number, data: ProductFormData) {
    return this.put$(`product/${id}`, data)
  }

  createProduct$(data: ProductFormData): Observable<Product> {
    return this.post$("product", data);
  }

  addCategoriesToProduct$(id: number, data: number[]): Observable<Product> {
    return this.post$(`product/${id}/category`, data);
  }

  protected getBaseUrl(): string {
    return `${environment.apiEndpoint}/${this.getResourceName()}`
  }
  protected getResourceName(): string {
    return 'products';
  }
}
