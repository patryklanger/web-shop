import { Component, OnDestroy } from '@angular/core';
import { ProductFormData } from '../product-form/product-form.model';
import { ProductGatewayService } from 'src/app/core/gateways/products/product-gateway.service';
import { NotificationService } from '../../../shared/notification/notification.service';
import { tap, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnDestroy {

  private readonly _destroy$ = new Subject<void>();

  constructor(private productGateway: ProductGatewayService, private notificationService: NotificationService) {}

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSubmit(formData: ProductFormData) {
    this.productGateway.createProduct$(formData).pipe(
      tap(() => this.notificationService.showSuccessNotification("Product created successfully")),
      takeUntil(this._destroy$)
    ).subscribe();
  }

}
