import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterPageComponent } from './register-page/register-page.component';
import { RegistrationGuard } from './registration.guard';

const routes: Routes = [
  { path: "", component: RegisterPageComponent, canActivate: [RegistrationGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
