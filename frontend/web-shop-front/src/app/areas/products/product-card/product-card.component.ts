import { Component, Input } from '@angular/core';

import { Product } from 'src/app/core/models/product/product.model';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngxs/store';
import { AppState, AppActions } from 'src/app/core/state/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product?: Product;
  @Input() details = false;

  constructor(private store: Store, private router: Router) {}

  addToCart() {
    this.store.dispatch(new AppActions.ChangeAmountInCart({ product: this.product!, quantity: 1 }))
  }

  getProductImg(): string {
    if (this.product.imgUrl === null) {
      return "/assets/no-image.jpeg";
    }
    return `${environment.apiEndpoint}/products/${this.product?.imgUrl}`
  }

  goToDetails() {
    this.router.navigateByUrl(`/products/details/${this.product.id}`)
  }

}
