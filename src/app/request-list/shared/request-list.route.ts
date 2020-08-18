// Component
import { RequestListComponent } from 'app/request-list/request-list.component';
import {RouterModule, Routes} from '@angular/router';

const REQUEST_LIST_ROUTES: Routes = [
  {
    path: 'requests',
    component: RequestListComponent,
  },
];

export let RequestListRouterModule = RouterModule.forRoot(REQUEST_LIST_ROUTES);
