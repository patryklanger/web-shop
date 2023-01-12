import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Category } from 'src/app/core/models/product/category.model';
import { CategoryFormData, FormType } from '../category-form/category.form-data.model';
import { CategoryGatewayService } from 'src/app/core/gateways/categories/category-gateway.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  category: Category;
  type = FormType.EDIT
  formData: CategoryFormData;

  private readonly _destroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute, private categoryGateway: CategoryGatewayService, private notificationService: NotificationService, private router: Router) {}

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(
      map((paramMap) => +paramMap.get("id")),
      filter((id) => !!id),
      switchMap(id => this.categoryGateway.getCategory$(id)),
      tap(category => this.category = category),
      tap(() => this.formData = { ...this.category }),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onSubmit(formData: CategoryFormData) {
    this.categoryGateway.editCategory$(this.category.id, formData).pipe(
      tap(() => this.notificationService.showSuccessNotification("Category edited successfully")),
      tap(() => this.router.navigateByUrl(`/categories`)),
      takeUntil(this._destroy$)
    ).subscribe();
  }

}
