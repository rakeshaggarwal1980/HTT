// Component
import { CovidDeclarationListComponent } from 'app/covid-declaration-list/covid-declaration-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/shared/guards/auth.guard.service';
import { NgModule } from '@angular/core';


const COVID_DECLARATION_LIST_ROUTES: Routes = [
  {
    path: 'coviddeclarations',
    component: CovidDeclarationListComponent,
    canActivate: [AuthGuardService]
  }
];



// @NgModule({
//   imports: [RouterModule.forRoot(DECLARATION_LIST_ROUTES)],
//   exports: [RouterModule]
// })
// export class DeclarationListRouterModule { }
export let CovidDeclarationListRouterModule = RouterModule.forRoot(COVID_DECLARATION_LIST_ROUTES);
