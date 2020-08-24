// Component
import { LoginComponent } from 'app/login/login.component';
import {RouterModule, Routes} from '@angular/router';

const LOGIN_ROUTES: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
];

export let LoginRouterModule = RouterModule.forRoot(LOGIN_ROUTES);
