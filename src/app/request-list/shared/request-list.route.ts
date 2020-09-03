// Component
import { RequestListComponent } from 'app/request-list/request-list.component';
import {RouterModule, Routes} from '@angular/router';
import { AuthGuardService } from 'app/shared/guards/auth.guard.service';

const REQUEST_LIST_ROUTES: Routes = [
  {
    path: 'requests',
    component: RequestListComponent,
    canActivate:[AuthGuardService]
  },
  {
    path: 'myrequests',
    component: RequestListComponent,
    canActivate:[AuthGuardService]
  },
];

export let RequestListRouterModule = RouterModule.forRoot(REQUEST_LIST_ROUTES);
