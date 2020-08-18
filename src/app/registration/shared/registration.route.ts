// Component
import { RegistrationComponent } from 'app/registration/registration.component';
import {RouterModule, Routes} from '@angular/router';

const REGISTRATION_ROUTES: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  },
];

export let RegistrationRouterModule = RouterModule.forRoot(REGISTRATION_ROUTES);
