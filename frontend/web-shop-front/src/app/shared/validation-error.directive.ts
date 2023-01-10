import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: 'mat-error[appError]'
})
export class ValidationErrorDirective implements OnChanges {
  @Input() appError: ValidationErrors

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.appError?.required) {
      this.el.nativeElement.innerText = "This field is required";
    }

    if (this.appError?.maxlength) {
      this.el.nativeElement.innerText = `Length cannot exceed ${this.appError.maxlength.requiredLength}`;
      return;
    }

    if (this.appError?.min) {
      this.el.nativeElement.innerText = `Minimal value is ${this.appError!.min.min}`;
      return;
    }

    if (this.appError?.max) {
      this.el.nativeElement.innerText = `Maximal value is ${this.appError.max.max}`;
      return;
    }
  }

}
