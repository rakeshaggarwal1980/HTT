// Component
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'app/shared/guards/auth.guard.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UserProfileComponent } from '../profile/user-profile.component';

const USER_ACCOUNT_ROUTES: Routes = [
  {
    path: 'changepassword',
    component: ChangePasswordComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuardService]
  }
];

export let UserAccountRouterModule = RouterModule.forRoot(USER_ACCOUNT_ROUTES);
