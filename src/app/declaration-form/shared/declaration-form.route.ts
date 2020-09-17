// Component
import { DeclarationFormComponent } from 'app/declaration-form/declaration-form.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/shared/guards/auth.guard.service';
import { NgModule } from '@angular/core';

const DECLARATION_FORM_ROUTES: Routes = [
  {
    path: 'selfdeclaration/:requestNumber',
    component: DeclarationFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'selfdeclaration',
    component: DeclarationFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'selfdeclaration/:requestNumber/:employeeId',
    component: DeclarationFormComponent,
    canActivate: [AuthGuardService]
  },
];

export let DeclarationFormRouterModule = RouterModule.forRoot(DECLARATION_FORM_ROUTES);
