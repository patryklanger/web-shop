import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormType, InitialProductFormData, ProductFormData } from './product-form.model';
import { FormGroup, FormBuilder, FormControl, Validators, ValidationErrors, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() type = FormType.CREATE
  @Input() formData: ProductFormData = InitialProductFormData;
  formGroup?: FormGroup;
  @Output() formDataSubmit: EventEmitter<ProductFormData> = new EventEmitter();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: new FormControl(this.formData.name, Validators.required),
      description: new FormControl(this.formData.description),
      stockAmount: new FormControl(this.formData.stockAmount, [Validators.required, Validators.min(0)]),
      price: new FormControl(this.formData.price, [Validators.required, Validators.min(0.01)]),
    })
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
