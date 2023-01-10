import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Category } from '../../../core/models/product/category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCardComponent {
  @Input() category?: Category;

  constructor(private router: Router) {}

  getProductImg(): string {
    return `${environment.apiEndpoint}/products/${this.category?.imgUrl}`
  }

  onCategoryClick() {
    this.router.navigateByUrl(`products?categoryId=${this.category?.id}`)
  }

}
