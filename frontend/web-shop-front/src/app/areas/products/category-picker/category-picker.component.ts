import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject, tap, BehaviorSubject, takeUntil, distinctUntilChanged, take } from 'rxjs';
import { FormControl } from '@angular/forms';


import { CategoryGatewayService } from 'src/app/core/gateways/categories/category-gateway.service';
import { CategoryShort } from 'src/app/core/models/product/category.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/core/state/user';

@Component({
  selector: 'app-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.scss']
})
export class CategoryPickerComponent implements OnInit, OnDestroy {
  @Input() currentCategory?: BehaviorSubject<string | undefined>;
  shortCategories: CategoryShort[] = [];
  categoryCtrl = new FormControl();
  isAdmin = false;

  private readonly _destroy$ = new Subject<void>();

  constructor(private categoryGateway: CategoryGatewayService, private router: Router, private activatedRoute: ActivatedRoute, private store: Store) {
  }

  ngOnInit() {
    const currentCategory$ = this.currentCategory.pipe(
      tap(value => this.categoryCtrl.setValue(+value)),
      takeUntil(this._destroy$)
    )

    this.categoryGateway.getCategoriesShort$().pipe(
      tap(categories => this.shortCategories = categories),
      tap(() => currentCategory$.subscribe()),
      take(1)
    ).subscribe()

    this.categoryCtrl.valueChanges.pipe(
      tap(value => this.setCurrentCategoryParam(value ? value : undefined)),
      takeUntil(this._destroy$)
    ).subscribe()

    this.store.select(UserState.roles).pipe(
      tap(roles => this.isAdmin = roles?.includes("admin")),
      takeUntil(this._destroy$)
    ).subscribe()

  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  goToAddProduct() {
    this.router.navigateByUrl('/products/add');
  }

  removeCategory() {
    this.categoryCtrl.setValue(null);
    this.currentCategory!.next(undefined);
  }

  private setCurrentCategoryParam(categoryId: number) {
    const queryParams: Params = { categoryId: categoryId };

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: queryParams,
        queryParamsHandling: 'merge',
      });
  }

}
