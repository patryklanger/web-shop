import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ProductGatewayService } from 'src/app/core/gateways/products/product-gateway.service';
import { Product } from 'src/app/core/models/product/product.model';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { FormType, ProductFormData } from '../product-form/product-form.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit, OnDestroy {
  product: Product;
  type = FormType.EDIT
  formData: ProductFormData;

  private readonly _destroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, private productGateway: ProductGatewayService, private notificationService: NotificationService, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      map((paramMap) => +paramMap.get("id")),
      filter((id) => !!id),
      switchMap(id => this.productGateway.getProduct$(id)),
      tap(product => this.product = product),
      tap(() => this.formData = { ...this.product }),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSubmit(formData: ProductFormData) {
    this.productGateway.editProduct$(this.product.id, formData).pipe(
      tap(() => this.notificationService.showSuccessNotification("Product edited successfully")),
      tap(() => this.router.navigateByUrl(`/products/details/${this.product.id}`)),
      takeUntil(this._destroy$)
    ).subscribe();
  }
}
