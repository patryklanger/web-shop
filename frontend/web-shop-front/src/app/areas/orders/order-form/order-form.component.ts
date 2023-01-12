import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Store } from '@ngxs/store';
import { OrderBasketElement } from 'src/app/core/models/order/order-basket-element.model';
import { Subject, tap, takeUntil } from 'rxjs';
import { OrderState, OrderActions } from 'src/app/core/state/order';
import { Order } from 'src/app/core/models/order/order.model';
import { OrderGatewayService } from 'src/app/core/gateways/order/order-gateway.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { SuccessOrderDialogComponent } from '../success-order-dialog/success-order-dialog.component';
import { AppActions } from 'src/app/core/state/app';

const PHONE_NUMBER_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, OnDestroy {
  formGroup = this.fb.group({
    city: new FormControl(null, Validators.required),
    street: new FormControl(null, Validators.required),
    buildingNumber: new FormControl(null, Validators.required),
    apartmentNumber: new FormControl(null),
    country: new FormControl(null, Validators.required),
    phoneNumber: new FormControl(null, [Validators.required])
  })

  private basket: OrderBasketElement[];
  private readonly _destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private store: Store, private orderGateway: OrderGatewayService, private router: Router, public dialog: MatDialog) {}

  get cityError(): ValidationErrors {
    return this.formGroup.get("city").errors
  }

  get streetError(): ValidationErrors {
    return this.formGroup.get("street").errors
  }

  get buildingNumberError(): ValidationErrors {
    return this.formGroup.get("buildingNumber").errors
  }

  get phoneNumberError(): ValidationErrors {
    return this.formGroup.get("phoneNumber").errors
  }

  get countryError(): ValidationErrors {
    return this.formGroup.get("country").errors
  }

  onSubmit() {
    let order: Order = {
      city: this.formGroup.get("city").value,
      street: this.formGroup.get("street").value,
      buildingNumber: this.formGroup.get("buildingNumber").value,
      phoneNumber: this.formGroup.get("phoneNumber").value,
      country: this.formGroup.get("country").value,
      basket: this.basket
    }

    if (!!this.formGroup.get("apartmentNumber").value && this.formGroup.get("apartmentNumber").value !== "") {
      order.apartmentNumber = this.formGroup.get("apartmentNumber").value;
    }

    this.orderGateway.createOrder$(order).pipe(
      tap(() => this.store.dispatch(new OrderActions.RemoveOrder)),
      tap(() => this.store.dispatch(new AppActions.EmptyCart)),
      tap((order) => this.openPayDialog(order.id)),
      tap(() => this.router.navigateByUrl("/products")),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  openPayDialog(id: number) {
    this.dialog.open(SuccessOrderDialogComponent, {
      data: { id: id },
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit() {
    this.store.select(OrderState.basket).pipe(
      tap(basket => this.basket = basket),
      takeUntil(this._destroy$)
    ).subscribe()
  }

}
