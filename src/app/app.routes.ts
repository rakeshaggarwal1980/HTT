/**
 * Created by Davinder Kaur on 10/08/2020.
 */
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from 'app/login/login.component';


const APP_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },

];

export let AppRouterModule = RouterModule.forRoot(APP_ROUTES, { scrollPositionRestoration: 'enabled' });

