// Component
import { ForgotPasswordComponent } from 'app/forgot-password/forgot-password.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/shared/guards/auth.guard.service';
import { NgModule } from '@angular/core';


const FORGOT_PASSWORD_ROUTES: Routes = [
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
];


// @NgModule({
//   imports: [RouterModule.forRoot(FORGOT_PASSWORD_ROUTES)],
//   exports: [RouterModule]
// })
// export class ForgotPasswordRouterModule { }
export let ForgotPasswordRouterModule = RouterModule.forRoot(FORGOT_PASSWORD_ROUTES);
