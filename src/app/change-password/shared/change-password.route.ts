// Component
import { ChangePasswordComponent } from 'app/change-password/change-password.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/shared/guards/auth.guard.service';

const CHANGE_PASSWORD_ROUTES: Routes = [
  {
    path: 'changepassword',
    component: ChangePasswordComponent,
    canActivate:[AuthGuardService]
  },
];

export let ChangePasswordRouterModule = RouterModule.forRoot(CHANGE_PASSWORD_ROUTES);
