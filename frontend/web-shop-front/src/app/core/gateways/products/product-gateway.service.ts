import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment.prod';
import { PaginatedResult } from '../../models/paginatedResult.model';
import { Product } from '../../models/product/product.model';
import { AbstractGatewayService } from '../abstract-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class ProductGatewayService extends AbstractGatewayService {

  getProducts$(page = 0, limit = 10): Observable<PaginatedResult<Product>> {
    const params = new HttpParams({
      fromObject: {
        page: page,
        limit: limit
      }
    })
    return this.get$("product", params)
  }

  protected getBaseUrl(): string {
    return `${environment.apiEndpoint}/${this.getResourceName()}`
  }
  protected getResourceName(): string {
    return 'products';
  }
}