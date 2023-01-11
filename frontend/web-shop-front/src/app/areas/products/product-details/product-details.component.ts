import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Subject, switchMap, tap, takeUntil } from 'rxjs';
import { Product } from 'src/app/core/models/product/product.model';
import { ProductGatewayService } from 'src/app/core/gateways/products/product-gateway.service';
import { MatDialog } from '@angular/material/dialog';
import { AddCategoriesDialogComponent } from '../add-categories-dialog/add-categories-dialog.component';
import { UploadImageDialogComponent } from 'src/app/shared/upload-image-dialog/upload-image-dialog.component';
import { uploadImageDialogConfig } from 'src/app/shared/upload-image-dialog/upload-image-dialog.config';
import { AddTagsDialogComponent } from 'src/app/shared/add-tags-dialog/add-tags-dialog.component';
import { addTagsDialogConfig } from 'src/app/shared/add-tags-dialog/add-tags-dialog.config';
import { UserState } from 'src/app/core/state/user';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: Product;
  isAdmin = false;

  private readonly _destroy$ = new Subject<void>();
  readonly productChanged$ = new Subject<Product>();

  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, private productGateway: ProductGatewayService, private router: Router, private store: Store) {}

  ngOnDestroy() {
    this.productChanged$.complete();

    this._destroy$.next();
    this._destroy$.complete();
  }
  openAddCategoriesDialog() {
    const currentCategories = this.product.categories.map(cat => cat.id);
    this.dialog.open(AddCategoriesDialogComponent, {
      data: { id: this.product.id, current: currentCategories, product$: this.productChanged$ },
    });
  }
  openAddImageDialog() {
    this.dialog.open(UploadImageDialogComponent, {
      ...uploadImageDialogConfig,
      data: { id: this.product.id, service: this.productGateway, objectChanged$: this.productChanged$ },
    });
  }

  openEditTagsDialog() {
    this.dialog.open(AddTagsDialogComponent, {
      ...addTagsDialogConfig,
      data: { id: this.product.id, service: this.productGateway, objectChanged$: this.productChanged$, currentTags: this.product.tags },
    });
  }

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      map((paramMap) => +paramMap.get("id")),
      filter((id) => !!id),
      switchMap(id => this.productGateway.getProduct$(id)),
      tap(product => this.product = product),
      takeUntil(this._destroy$)
    ).subscribe()

    this.productChanged$.pipe(
      tap(product => this.product = product),
      takeUntil(this._destroy$))
      .subscribe();

    this.store.select(UserState.roles).pipe(
      tap(roles => this.isAdmin = roles?.includes("admin")),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  edit() {
    this.router.navigateByUrl(`/products/edit/${this.product.id}`)
  }

}
