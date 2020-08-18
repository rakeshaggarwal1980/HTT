import { TranslateModule } from '@ngx-translate/core';
// components
import { RegistrationComponent } from 'app/registration/registration.component';

// modules
import { RegistrationRouterModule } from 'app/registration/shared/registration.route';
import { SharedModule } from 'app/shared/shared.module';
import {NgModule} from '@angular/core';


@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    RegistrationRouterModule,
  ],
  exports: [],
  declarations: [
    RegistrationComponent
  ],
  providers: [],
})
export class RegistrationModule {
}
