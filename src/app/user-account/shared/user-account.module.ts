import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'app/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from 'vendor/angular';
import { SnackBarService } from 'app/shared/snackbar/snackbar.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import { UserAccountRouterModule } from './user-account.route';
import { UserAccountService } from './user-account.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { UserProfileComponent } from '../profile/user-profile.component';
import { SpinnerService } from 'app/shared/index.shared';

@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDatepickerModule,
    UserAccountRouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [MatInputModule, MatFormFieldModule,
    MatNativeDateModule, MatMomentDateModule, MatDatepickerModule],
  declarations: [
    ChangePasswordComponent,
    UserProfileComponent
  ],
  providers: [UserAccountService, SnackBarService, SpinnerService],
})
export class UserAccountModule {
}
