import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Subject, tap } from 'rxjs';
import { UserGatewayService } from 'src/app/core/gateways/user/user-gateway.service';
import { RegisterPageFormData } from './register-page-form-data.model';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnDestroy {
  formGroup = this.fb.group({
    username: new FormControl(null, Validators.required),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required)
  })

  private readonly _destroy$ = new Subject<void>();

  constructor(private fb: FormBuilder, private userGateway: UserGatewayService,
    private notificationService: NotificationService, private router: Router) {}

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  get usernameErrors(): ValidationErrors {
    return this.formGroup.get('username').errors;
  }

  get firstNameErrors(): ValidationErrors {
    return this.formGroup.get('firstName').errors
  }

  get lastNameErrors(): ValidationErrors {
    return this.formGroup.get('lastName').errors
  }

  get emailErrors(): ValidationErrors {
    return this.formGroup.get('email').errors;
  }

  get passwordErrors(): ValidationErrors {
    return this.formGroup.get('password').errors;
  }

  onFormSubmit() {
    const formData: RegisterPageFormData = {
      username: this.formGroup.get('username').value,
      firstName: this.formGroup.get('firstName').value,
      lastName: this.formGroup.get('lastName').value,
      email: this.formGroup.get('email').value,
      password: this.formGroup.get('password').value,
    }

    this.userGateway.createUser$(formData).pipe(
      tap(() => this.notificationService.showSuccessNotification("Registration successful")),
      tap(() => this.router.navigateByUrl('/auth')),
      takeUntil(this._destroy$)
    ).subscribe();
  }



}
