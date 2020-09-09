// Component
import { DeclarationFormComponent } from 'app/declaration-form/declaration-form.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/shared/guards/auth.guard.service';

const DECLARATION_FORM_ROUTES: Routes = [
  {
    path: 'declaration/:requestNumber',
    component: DeclarationFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'declaration',
    component: DeclarationFormComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'declaration/:requestNumber/:employeeId',
    component: DeclarationFormComponent,
    canActivate: [AuthGuardService]
  },
];

export let DeclarationFormRouterModule = RouterModule.forRoot(DECLARATION_FORM_ROUTES);
