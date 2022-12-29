import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';

import { CategoryGatewayService } from 'src/app/core/gateways/categories/category-gateway.service';
import { PaginatedResult } from 'src/app/core/models/paginatedResult.model';
import { Category } from 'src/app/core/models/product/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryListComponent implements OnInit, OnDestroy {
  categories?: Category[];
  pagesNumber = 0;

  private readonly currentPage$ = new BehaviorSubject(0);
  private readonly _destroy$ = new Subject<void>()

  constructor(private categoryGateway: CategoryGatewayService, private cdr: ChangeDetectorRef) {}

  ngOnDestroy() {
    this._destroy$.next()
    this._destroy$.complete()

    this.currentPage$.complete()
  }

  ngOnInit() {
    this.currentPage$.pipe(
      switchMap((currentPage) => this.currentPageCategories$(currentPage)),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  nextPage() {
    this.currentPage$.next(this.currentPage$.getValue() + 1);
  }

  previousPage() {
    this.currentPage$.next(this.currentPage$.getValue() - 1);
  }


  private currentPageCategories$(currentPage: number): Observable<PaginatedResult<Category>> {
    return this.categoryGateway.getCategories$(currentPage).pipe(
      tap(categories => this.categories = categories.results),
      tap(categories => this.pagesNumber = categories.totalCount / categories.count),
      tap(() => this.cdr.markForCheck()),
    )
  }

}
