// Component
import { LoginComponent } from 'app/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const LOGIN_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

// @NgModule({
//   imports: [RouterModule.forRoot(LOGIN_ROUTES)],
//   exports: [RouterModule]
// })
// export class LoginRouterModule { }

export let LoginRouterModule = RouterModule.forRoot(LOGIN_ROUTES);
