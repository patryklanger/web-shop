import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { PaginatedResult } from '../../models/paginatedResult.model';
import { Product, ProductFormData } from '../../models/product/product.model';
import { AbstractGatewayService, BodyParams } from '../abstract-gateway.service';
import { ImageGatewayService } from '../abstract-image.service';
import { TagGatewayService } from '../abstract-tag.service';

@Injectable({
  providedIn: 'root'
})
export class ProductGatewayService extends AbstractGatewayService implements ImageGatewayService<Product>,
  TagGatewayService<Product> {
  setTags$(tags: string[], objectId: number): Observable<Product> {
    return this.post$(`/product/${objectId}/tag`, tags);
  }

  getProductList$(ids: number[]): Observable<Product[]> {
    return this.post$(`product/list`, ids);
  }

  uploadImage$(image: File, objectId: number): Observable<Product> {
    const formData = new FormData();
    formData.append("image", image);
    return this.post$(`/product/${objectId}/image`, formData);
  }

  deleteProduct$(productId): Observable<any> {
    return this.delete$(`/product/${productId}`);
  }

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
