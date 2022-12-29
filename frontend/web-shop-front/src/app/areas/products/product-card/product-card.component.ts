import { Component, Input } from '@angular/core';

import { Product } from 'src/app/core/models/product/product.model';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngxs/store';
import { AppState, AppActions } from 'src/app/core/state/app';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product?: Product;

  constructor(private store: Store) {}

  addToCart() {
    this.store.dispatch(new AppActions.AddToCart({ product: this.product!, quantity: 1 }))
  }

  getProductImg(): string {
    return `${environment.apiEndpoint}/products/${this.product?.imgUrl}`
  }

}
