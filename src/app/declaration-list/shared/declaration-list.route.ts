// Component
import { DeclarationListComponent } from 'app/declaration-list/declaration-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/shared/guards/auth.guard.service';
import { NgModule } from '@angular/core';


const DECLARATION_LIST_ROUTES: Routes = [
  {
    path: 'declarations',
    component: DeclarationListComponent,
    canActivate: [AuthGuardService]
  },
];



// @NgModule({
//   imports: [RouterModule.forRoot(DECLARATION_LIST_ROUTES)],
//   exports: [RouterModule]
// })
// export class DeclarationListRouterModule { }
export let DeclarationListRouterModule = RouterModule.forRoot(DECLARATION_LIST_ROUTES);
