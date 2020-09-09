import { TranslateModule } from '@ngx-translate/core';
// components
import { ChangePasswordComponent } from 'app/change-password/change-password.component';

// modules
import { ChangePasswordRouterModule } from 'app/change-password/shared/change-password.route';
import { ChangePasswordService } from 'app/change-password/shared/change-password.service';
import { SharedModule } from 'app/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { FormsModule } from 'vendor/angular';
import { SnackBarService } from 'app/shared/snackbar/snackbar.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDatepickerModule,
    ChangePasswordRouterModule,
    FormsModule

  ],
  exports: [MatInputModule,MatFormFieldModule, MatNativeDateModule, MatMomentDateModule, MatDatepickerModule],
  declarations: [
    ChangePasswordComponent
  ],
  providers: [ChangePasswordService,SnackBarService],
})
export class ChangePasswordModule {
}
