import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject, tap, BehaviorSubject } from 'rxjs';
import { CategoryGatewayService } from 'src/app/core/gateways/categories/category-gateway.service';
import { CategoryShort } from 'src/app/core/models/product/category.model';
import { takeUntil } from 'rxjs';
import { FormControl } from '@angular/forms';

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

  constructor(private categoryGateway: CategoryGatewayService) {
  }

  ngOnInit() {
    this.categoryGateway.getCategoriesShort$().pipe(
      tap(categories => this.shortCategories = categories),
      takeUntil(this._destroy$)
    ).subscribe()

    this.categoryCtrl.valueChanges.pipe(
      tap(value => this.currentCategory!.next(value)),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  removeCategory() {
    this.categoryCtrl.setValue(null);
    this.currentCategory!.next(undefined);
  }

}
