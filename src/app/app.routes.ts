/**
 * Created by Davinder Kaur on 10/08/2020.
 */
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'app/login/index.login';
import { NgModule } from '@angular/core';

const APP_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    redirectTo: '',
  },
  {
    path: '**',
    redirectTo: '404',
  },

];


// @NgModule({
//   imports: [RouterModule.forRoot(APP_ROUTES)],
//   exports: [RouterModule]
// })
// export class AppRouterModule { }

export let AppRouterModule = RouterModule.forRoot(APP_ROUTES, { useHash: true });

