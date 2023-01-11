import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, combineLatest, distinctUntilChanged, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { CategoryGatewayService } from 'src/app/core/gateways/categories/category-gateway.service';
import { PaginatedResult } from 'src/app/core/models/paginatedResult.model';
import { Category } from 'src/app/core/models/product/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories?: Category[];
  totalCount = 0;

  readonly currentPage$ = new BehaviorSubject(0);
  readonly currentPageSize$ = new BehaviorSubject(10);
  private readonly _destroy$ = new Subject<void>()

  constructor(private categoryGateway: CategoryGatewayService, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnDestroy() {
    this.currentPage$.complete();
    this.currentPageSize$.complete();

    this._destroy$.next();
    this._destroy$.complete()
  }

  ngOnInit() {
    combineLatest([
      this.currentPage$.pipe(distinctUntilChanged()),
      this.currentPageSize$.pipe(distinctUntilChanged())]).pipe(
        switchMap(([currentPage, currentPageSize]) => this.currentPageCategories$(currentPage, currentPageSize)),
        takeUntil(this._destroy$)
      ).subscribe()
  }

  goToAddCategory() {
    this.router.navigateByUrl("/categories/add")
  }

  private currentPageCategories$(currentPage: number, currentPageSize: number): Observable<PaginatedResult<Category>> {
    return this.categoryGateway.getCategories$(currentPage, currentPageSize).pipe(
      tap(categories => this.categories = categories.results),
      tap(categories => this.totalCount = categories.totalCount),
      tap(() => this.cdr.markForCheck()),
    )
  }

}
