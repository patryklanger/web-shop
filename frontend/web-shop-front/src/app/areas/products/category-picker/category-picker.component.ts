import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject, tap, BehaviorSubject, takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';


import { CategoryGatewayService } from 'src/app/core/gateways/categories/category-gateway.service';
import { CategoryShort } from 'src/app/core/models/product/category.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-category-picker',
  templateUrl: './category-picker.component.html',
  styleUrls: ['./category-picker.component.scss']
})
export class CategoryPickerComponent implements OnInit, OnDestroy {
  @Input() currentCategory?: BehaviorSubject<string | undefined>;
  shortCategories: CategoryShort[] = [];
  categoryCtrl = new FormControl();

  private readonly _destroy$ = new Subject<void>();

  constructor(private categoryGateway: CategoryGatewayService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.categoryCtrl.setValue(+this.currentCategory.getValue())
    this.categoryGateway.getCategoriesShort$().pipe(
      tap(categories => this.shortCategories = categories),
      takeUntil(this._destroy$)
    ).subscribe()

    this.categoryCtrl.valueChanges.pipe(
      tap(value => this.setCurrentCategoryParam(value)),
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
