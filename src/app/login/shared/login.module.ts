import { TranslateModule } from '@ngx-translate/core';
// components
import { LoginComponent } from 'app/login/login.component';

// modules
import { LoginRouterModule } from 'app/login/shared/login.route';
import { LoginService } from 'app/login/shared/login.service';
import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';
import { FormsModule } from 'vendor/angular';


@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    LoginRouterModule,
    FormsModule
  ],
  exports: [],
  declarations: [
    LoginComponent
  ],
  providers: [LoginService],
})
export class LoginModule {
}
