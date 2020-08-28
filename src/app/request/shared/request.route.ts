// Component
import { RequestComponent } from 'app/request/request.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/shared/guards/auth.guard.service';

const REQUEST_ROUTES: Routes = [
  {
    path: 'request',
    component: RequestComponent,
    canActivate:[AuthGuardService]
  },
];

export let RequestRouterModule = RouterModule.forRoot(REQUEST_ROUTES);
