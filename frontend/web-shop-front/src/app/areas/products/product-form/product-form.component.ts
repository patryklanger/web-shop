import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { FormType, InitialProductFormData, ProductFormData } from './product-form.model';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors, FormGroupDirective } from '@angular/forms';
import { ProductGatewayService } from 'src/app/core/gateways/products/product-gateway.service';
import { Subject, tap, takeUntil } from 'rxjs';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @Input() type = FormType.CREATE
  @Input() formData: ProductFormData = InitialProductFormData;
  formGroup?: FormGroup;
  @Output() formDataSubmit: EventEmitter<ProductFormData> = new EventEmitter();

  private readonly _destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private productGateway: ProductGatewayService, private notificationService: NotificationService, private router: Router) {
  }

  isEditing(): boolean {
    return this.type === FormType.EDIT;
  }

  deleteProduct() {
    this.productGateway.deleteProduct$(this.formData.id).pipe(
      tap(() => this.notificationService.showSuccessNotification("Product deleted")),
      tap(() => this.router.navigateByUrl('/products')),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: new FormControl(this.formData.name, Validators.required),
      description: new FormControl(this.formData.description),
      stockAmount: new FormControl(this.formData.stockAmount, [Validators.required, Validators.min(0)]),
      price: new FormControl(this.formData.price, [Validators.required, Validators.min(0.01)]),
    })
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  get nameError(): ValidationErrors {
    return this.formGroup!.get("name").errors
  }

  get descriptionError(): ValidationErrors {
    return this.formGroup!.get("description").errors
  }

  get stockAmountError(): ValidationErrors {
    return this.formGroup!.get("stockAmount").errors
  }

  get priceError(): ValidationErrors {
    return this.formGroup!.get("price").errors
  }

  onSubmit(directive: FormGroupDirective) {
    this.formDataSubmit.emit({
      name: this.formGroup.get('name').value,
      description: this.formGroup.get('description').value,
      price: this.formGroup.get('price').value,
      stockAmount: this.formGroup.get('stockAmount').value,
    })
    if (this.type === FormType.CREATE) {
      this.formGroup.reset();
      directive.resetForm();
    }
  }

}
