import { Component, Inject, OnInit, OnDestroy, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject, takeUntil, tap } from 'rxjs';
import { CategoryGatewayService } from 'src/app/core/gateways/categories/category-gateway.service';
import { CategoryShort } from 'src/app/core/models/product/category.model';
import { CategoriesDialogData } from './categories-dialog-data.model';
import { ProductGatewayService } from 'src/app/core/gateways/products/product-gateway.service';
import { NotificationService } from '../../../shared/notification/notification.service';
import { Product } from 'src/app/core/models/product/product.model';

@Component({
  selector: 'app-add-categories-dialog',
  templateUrl: './add-categories-dialog.component.html',
  styleUrls: ['./add-categories-dialog.component.scss']
})
export class AddCategoriesDialogComponent implements OnInit, OnDestroy {
  shortCategories: CategoryShort[] = [];
  currentCategories: Set<number>;
  private readonly _destroy$ = new Subject<void>();

  constructor(
    public dialogRef: MatDialogRef<AddCategoriesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoriesDialogData,
    private categoryGateway: CategoryGatewayService,
    private productGateway: ProductGatewayService,
    private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.categoryGateway.getCategoriesShort$().pipe(
      tap(categories => this.shortCategories = categories),
      takeUntil(this._destroy$)
    ).subscribe()

    this.currentCategories = new Set(this.data.current);
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onCheckChange(event: MatCheckboxChange) {
    event.checked ?
      this.currentCategories.add(+event.source.value) :
      this.currentCategories.delete(+event.source.value)
    console.log(this.currentCategories);
  }
  onSubmit() {
    const categories = [...this.currentCategories]
    this.productGateway.addCategoriesToProduct$(this.data.id, categories).pipe(
      tap((product) => this.data.product$.next(product)),
      tap(() => this.notificationService.showSuccessNotification("Categories added")),
      tap(() => this.dialogRef.close()),
      takeUntil(this._destroy$)
    ).subscribe()
  }

}
