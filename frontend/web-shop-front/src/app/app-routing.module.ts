import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './pages/error-page/error-page.component';

const routes: Routes = [
  { path: "", loadChildren: () => import('./areas/areas.module').then(m => m.AreasModule) },
  { path: "auth", loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) },
  { path: "register", loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) },
  { path: "404", component: ErrorPageComponent },
  { path: "**", redirectTo: "404" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
