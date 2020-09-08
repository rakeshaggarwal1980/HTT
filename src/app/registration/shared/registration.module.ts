import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
// components
import { RegistrationComponent } from 'app/registration/registration.component';

// modules
import { RegistrationRouterModule } from 'app/registration/shared/registration.route';
import { RegistrationService } from 'app/registration/shared/registration.service';
import { SharedModule } from 'app/shared/shared.module';
import { SnackBarService } from 'app/shared/snackbar/snackbar.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
                                                    

@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    RegistrationRouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressSpinnerModule  
  ],
  exports: [],
  declarations: [
    RegistrationComponent
  ],
  providers: [RegistrationService, SnackBarService],
})
export class RegistrationModule {
}
