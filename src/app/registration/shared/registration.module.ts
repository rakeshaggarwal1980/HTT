import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
// components
import { RegistrationComponent } from 'app/registration/registration.component';

// modules
import { RegistrationRouterModule } from 'app/registration/shared/registration.route';
import { RegistrationService } from 'app/registration/shared/registration.service';
import { SharedModule } from 'app/shared/shared.module';
import { SnackBarService } from 'app/shared/snackbar/snackbar.service';


@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    RegistrationRouterModule,
    FormsModule
  ],
  exports: [],
  declarations: [
    RegistrationComponent
  ],
  providers: [RegistrationService,SnackBarService],
})
export class RegistrationModule {
}
