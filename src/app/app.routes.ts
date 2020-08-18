/**
 * Created by Davinder Kaur on 10/08/2020.
 */
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from 'app/registration/registration.component';


const APP_ROUTES: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  },
  {
    path: '**',
    redirectTo: '404',
  },

];

export let AppRouterModule = RouterModule.forRoot(APP_ROUTES, { scrollPositionRestoration: 'enabled' });

