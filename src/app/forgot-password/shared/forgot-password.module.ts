import { TranslateModule } from '@ngx-translate/core';
// components
import { ForgotPasswordComponent } from 'app/forgot-password/forgot-password.component';

// modules
import { ForgotPasswordRouterModule } from 'app/forgot-password/shared/forgot-password.route';
import { ForgotPasswordService } from 'app/forgot-password/shared/forgot-password.service';
import { SharedModule } from 'app/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';
import { FormsModule } from 'vendor/angular';
import { SnackBarService } from 'app/shared/snackbar/snackbar.service';
import { MatNativeDateModule } from '@angular/material/core';
import {
  MatProgressSpinnerModule
} from '@angular/material/progress-spinner';
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
    ForgotPasswordRouterModule,
    FormsModule,
    MatProgressSpinnerModule

  ],
  exports: [MatInputModule, MatFormFieldModule, MatNativeDateModule, MatMomentDateModule, MatDatepickerModule],
  declarations: [
    ForgotPasswordComponent
  ],
  providers: [ForgotPasswordService, SnackBarService, { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }],
})
export class ForgotPasswordModule {
}
