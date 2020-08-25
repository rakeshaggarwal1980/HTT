// Component
import { RequestComponent } from 'app/request/request.component';
import { RouterModule, Routes } from '@angular/router';

const REQUEST_ROUTES: Routes = [
  {
    path: 'request',
    component: RequestComponent,
  },
];

export let RequestRouterModule = RouterModule.forRoot(REQUEST_ROUTES);
