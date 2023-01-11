import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, ValidationErrors, Validators } from '@angular/forms';
import { Subject, takeUntil, tap } from 'rxjs';
import { CategoryFormData, FormType, InitialCategoryFormData } from './category.form-data.model';
import { CategoryGatewayService } from 'src/app/core/gateways/categories/category-gateway.service';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UploadImageDialogComponent } from 'src/app/shared/upload-image-dialog/upload-image-dialog.component';
import { uploadImageDialogConfig } from 'src/app/shared/upload-image-dialog/upload-image-dialog.config';
import { Category } from 'src/app/core/models/product/category.model';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  @Input() type = FormType.CREATE
  @Input() formData: CategoryFormData = InitialCategoryFormData;
  formGroup?: FormGroup;
  @Output() formDataSubmit: EventEmitter<CategoryFormData> = new EventEmitter();
  readonly imageUploaded$ = new Subject<unknown>();

  private readonly _destroy$ = new Subject<void>();

  constructor(public dialog: MatDialog, private fb: FormBuilder, private categoryGateway: CategoryGatewayService, private notificationService: NotificationService, private router: Router) {}

  isEditing(): boolean {
    return this.type === FormType.EDIT;
  }

  deleteCategory() {
    this.categoryGateway.deleteCategory$(this.formData.id).pipe(
      tap(() => this.notificationService.showSuccessNotification("Category deleted")),
      tap(() => this.router.navigateByUrl('/categories')),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: new FormControl(this.formData.name, Validators.required),
      description: new FormControl(this.formData.description),
    })

    this.imageUploaded$.pipe(
      tap(() => this.notificationService.showSuccessNotification("Image successfully uploaded")),
      takeUntil(this._destroy$)
    ).subscribe()
  }

  openAddImageDialog() {
    this.dialog.open(UploadImageDialogComponent, {
      ...uploadImageDialogConfig,
      data: { id: this.formData.id, service: this.categoryGateway, objectChanged$: this.imageUploaded$ },
    });
  }

  ngOnDestroy() {
    this.imageUploaded$.complete();

    this._destroy$.next();
    this._destroy$.complete();
  }

  get nameError(): ValidationErrors {
    return this.formGroup!.get("name").errors
  }

  onSubmit(directive: FormGroupDirective) {
    this.formDataSubmit.emit({
      name: this.formGroup.get('name').value,
      description: this.formGroup.get('description').value,
    })
    if (this.type === FormType.CREATE) {
      this.formGroup.reset();
      directive.resetForm();
    }
  }

}
