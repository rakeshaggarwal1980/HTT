// Component
import { DeclarationFormComponent } from 'app/declaration-form/declaration-form.component';
import {RouterModule, Routes} from '@angular/router';

const DECLARATION_FORM_ROUTES: Routes = [
  {
    path: 'declaration/:requestNumber',
    component: DeclarationFormComponent,
  },
  {
    path: 'declaration/:requestNumber/:employeeId',
    component: DeclarationFormComponent,
  },
];

export let DeclarationFormRouterModule = RouterModule.forRoot(DECLARATION_FORM_ROUTES);
