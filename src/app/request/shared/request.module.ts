import { TranslateModule } from '@ngx-translate/core';
// components
import { RequestComponent } from 'app/request/request.component';

// modules
import { RequestRouterModule } from 'app/request/shared/request.route';
import { RequestService } from 'app/request/shared/request.service';
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
    RequestRouterModule,
    FormsModule

  ],
  exports: [MatInputModule,MatFormFieldModule, MatNativeDateModule, MatMomentDateModule, MatDatepickerModule],
  declarations: [
    RequestComponent
  ],
  providers: [RequestService,SnackBarService,{provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}],
})
export class RequestModule {
}
