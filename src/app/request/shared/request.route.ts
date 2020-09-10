// Component
import { RequestComponent } from 'app/request/request.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/shared/guards/auth.guard.service';
import { NgModule } from '@angular/core';


const REQUEST_ROUTES: Routes = [
  {
    path: 'request',
    component: RequestComponent,
    canActivate: [AuthGuardService]
  },
];


// @NgModule({
//   imports: [RouterModule.forRoot(REQUEST_ROUTES)],
//   exports: [RouterModule]
// })
// export class RequestRouterModule { }
export let RequestRouterModule = RouterModule.forRoot(REQUEST_ROUTES);
