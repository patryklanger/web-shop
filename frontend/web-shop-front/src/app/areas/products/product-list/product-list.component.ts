import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ProductGatewayService } from 'src/app/core/gateways/products/product-gateway.service';
import { Product } from 'src/app/core/models/product/product.model';
import { BehaviorSubject, Subject, switchMap, tap, takeUntil, Observable, ReplaySubject, combineLatest, map, filter, distinctUntilChanged } from 'rxjs';
import { PaginatedResult } from 'src/app/core/models/paginatedResult.model';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Product[];
  totalCount = 0;

  readonly currentPage$ = new BehaviorSubject(0);
  readonly currentPageSize$ = new BehaviorSubject(10);
  readonly categoryId$ = new BehaviorSubject<string | undefined>(undefined);
  private readonly _destroy$ = new Subject<void>()

  constructor(private productGateway: ProductGatewayService, private cdr: ChangeDetectorRef, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnDestroy() {
    this.currentPage$.complete();
    this.categoryId$.complete();
    this.currentPageSize$.complete();

    this._destroy$.next();
    this._destroy$.complete()
  }

  ngOnInit() {
    combineLatest([
      this.currentPage$.pipe(distinctUntilChanged()),
      this.currentPageSize$.pipe(distinctUntilChanged()),
      this.categoryId$.pipe(distinctUntilChanged())]).pipe(
        switchMap(([currentPage, currentPageSize, categoryId]) => this.currentPageProducts$(currentPage, currentPageSize, categoryId)),
        takeUntil(this._destroy$)
      ).subscribe()

    this.activatedRoute.queryParamMap.pipe(
      map(paramMap => paramMap.get("categoryId")),
      tap(id => this.categoryId$.next(id!)),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  goToAddProduct() {
    this.router.navigateByUrl('/products/add');
  }

  private currentPageProducts$(currentPage: number, currentPageSize: number, categoryId?: string): Observable<PaginatedResult<Product>> {
    return this.productGateway.getProducts$(currentPage, currentPageSize, categoryId).pipe(
      tap(products => this.products = products.results),
      tap(products => this.totalCount = products.totalCount),
      tap(() => this.cdr.markForCheck()),
    )
  }
}
