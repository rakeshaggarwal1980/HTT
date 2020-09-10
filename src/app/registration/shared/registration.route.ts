// Component
import { RegistrationComponent } from 'app/registration/registration.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const REGISTRATION_ROUTES: Routes = [
  {
    path: 'register',
    component: RegistrationComponent,
  },
];

// @NgModule({
//   imports: [RouterModule.forRoot(REGISTRATION_ROUTES)],
//   exports: [RouterModule]
// })
// export class RegistrationRouterModule { }

export let RegistrationRouterModule = RouterModule.forRoot(REGISTRATION_ROUTES);
