// Component
import { UserListComponent } from 'app/user-list/user-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/shared/guards/auth.guard.service';
import { NgModule } from '@angular/core';

const USER_LIST_ROUTES: Routes = [
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuardService]
  },
];

// @NgModule({
//   imports: [RouterModule.forRoot(USER_LIST_ROUTES)],
//   exports: [RouterModule]
// })
// export class UserListRouterModule { }

export let UserListRouterModule = RouterModule.forRoot(USER_LIST_ROUTES);
