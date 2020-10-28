import { TranslateModule } from '@ngx-translate/core';
// components
import { CovidFormComponent } from 'app/covid-form/covid-form.component';

// modules
import { CovidFormRouterModule } from 'app/covid-form/shared/covid-form.route';
import { SharedModule } from 'app/shared/shared.module';
import { MatDatepickerModule, MatDialogModule, MatSnackBarModule } from 'vendor/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { NgModule } from '@angular/core';
import { CovidFormService } from 'app/covid-form/shared/covid-form.service';
import { FormsModule, ReactiveFormsModule } from 'vendor/angular';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";

import {
  MatProgressSpinnerModule
} from '@angular/material/progress-spinner';
import { SnackBarService } from 'app/shared/snackbar/snackbar.service';


@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    CovidFormRouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatProgressSpinnerModule
  ],
  exports: [MatInputModule, MatFormFieldModule, MatNativeDateModule, MatMomentDateModule, MatDatepickerModule],
  declarations: [
    CovidFormComponent
  ],
  providers: [CovidFormService, SnackBarService, { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }],
})
export class CovidFormModule {
}
