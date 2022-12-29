import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { AbstractGatewayService } from '../abstract-gateway.service';
import { Observable } from 'rxjs';
import { PaginatedResult } from 'src/app/core/models/paginatedResult.model';
import { Category } from '../../models/product/category.model';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryGatewayService extends AbstractGatewayService {

  getCategories$(page = 0, limit = 10): Observable<PaginatedResult<Category>> {
    const params = new HttpParams({
      fromObject: {
        page: page,
        limit: limit
      }
    })
    return this.get$("category", params)
  }


  protected getBaseUrl(): string {
    return `${environment.apiEndpoint}/${this.getResourceName()}`
  }
  protected getResourceName(): string {
    return 'products';
  }


}
