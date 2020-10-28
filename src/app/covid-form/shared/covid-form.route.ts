// Component
import { CovidFormComponent } from 'app/covid-form/covid-form.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/shared/guards/auth.guard.service';
import { NgModule } from '@angular/core';

const COVID_FORM_ROUTES: Routes = [
  {
    path: 'coviddeclaration',
    component: CovidFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'coviddeclaration/:declarationId',
    component: CovidFormComponent,
    canActivate: [AuthGuardService]
  },
];

export let CovidFormRouterModule = RouterModule.forRoot(COVID_FORM_ROUTES);
