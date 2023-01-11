import { Component, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { CategoryGatewayService } from 'src/app/core/gateways/categories/category-gateway.service';
import { ProductGatewayService } from 'src/app/core/gateways/products/product-gateway.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { CategoryFormData } from '../category-form/category.form-data.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {

  private readonly _destroy$ = new Subject<void>();

  constructor(private categoryGateway: CategoryGatewayService, private notificationService: NotificationService) {}

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSubmit(formData: CategoryFormData) {
    this.categoryGateway.createCategory$(formData).pipe(
      tap(() => this.notificationService.showSuccessNotification("Category created successfully")),
      takeUntil(this._destroy$)
    ).subscribe();
  }

}
