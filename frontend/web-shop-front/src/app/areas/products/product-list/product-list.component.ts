import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ProductGatewayService } from 'src/app/core/gateways/products/product-gateway.service';
import { Product } from 'src/app/core/models/product/product.model';
import { BehaviorSubject, Subject, switchMap, tap, takeUntil, Observable } from 'rxjs';
import { PaginatedResult } from 'src/app/core/models/paginatedResult.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy {
  products?: Product[];
  pagesNumber = 0;

  private readonly currentPage$ = new BehaviorSubject(0);
  private readonly _destroy$ = new Subject<void>()

  constructor(private productGateway: ProductGatewayService) {}

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete()
  }

  ngOnInit() {
    this.currentPage$.pipe(
      switchMap((currentPage) => this.currentPageProducts$(currentPage)),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  nextPage() {
    this.currentPage$.next(this.currentPage$.getValue() + 1);
  }

  previousPage() {
    this.currentPage$.next(this.currentPage$.getValue() - 1);
  }

  private currentPageProducts$(currentPage: number): Observable<PaginatedResult<Product>> {
    return this.productGateway.getProducts$(currentPage).pipe(
      tap(products => this.products = products.results),
      tap(products => this.pagesNumber = products.totalCount / products.count)
    )
  }
}
