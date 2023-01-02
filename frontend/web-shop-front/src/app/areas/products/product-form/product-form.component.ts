import { Component, Input, OnInit } from '@angular/core';
import { FormType, InitialProductFormData, ProductFormData } from './product-form.model';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  @Input() type = FormType.CREATE
  @Input() formData: ProductFormData = InitialProductFormData;
  formGroup?: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      name: new FormControl(this.formData.name, Validators.required),
      description: new FormControl(this.formData.description),
      stockAmount: new FormControl(this.formData.stockAmount, [Validators.required, Validators.min(0)]),
      price: new FormControl(this.formData.price, [Validators.required, Validators.min(0.01)]),
    })
  }

  ngOnInit(): void {

  }

}
