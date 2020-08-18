// Component
import { CovidFormComponent } from 'app/covid-form/covid-form.component';
import {RouterModule, Routes} from '@angular/router';

const COVID_FORM_ROUTES: Routes = [
  {
    path: 'covidinfo',
    component: CovidFormComponent,
  },
];

export let CovidFormRouterModule = RouterModule.forRoot(COVID_FORM_ROUTES);
