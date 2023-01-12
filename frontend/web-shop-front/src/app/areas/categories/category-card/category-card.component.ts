import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Category } from '../../../core/models/product/category.model';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserState } from 'src/app/core/state/user';
import { Subject, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryCardComponent implements OnInit, OnDestroy {
  @Input() category?: Category;
  isAdmin = false;

  private readonly _destroy$ = new Subject<void>();

  constructor(private router: Router, private store: Store) {}

  ngOnInit() {
    this.store.select(UserState.roles).pipe(
      tap(roles => this.isAdmin = roles?.includes("admin")),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  getProductImg(): string {
    if (this.category.imgUrl === null) {
      return "/assets/no-image.jpeg";
    }
    return `${environment.apiEndpoint}/products/${this.category?.imgUrl}`
  }

  onCategoryClick() {
    this.router.navigateByUrl(`products?categoryId=${this.category?.id}`)
  }

  goToEdit() {
    this.router.navigateByUrl(`/categories/edit/${this.category.id}`)
  }

}
