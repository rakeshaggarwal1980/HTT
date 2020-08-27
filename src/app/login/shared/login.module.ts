import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
// components
import { LoginComponent } from '../login.component';

// modules
import { LoginRouterModule } from './login.route';
import { LoginService } from 'app/login/shared/login.service';
import { SharedModule } from 'app/shared/shared.module';
import {
  MatProgressSpinnerModule
} from 'vendor/material';



@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    LoginRouterModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  exports: [],
  declarations: [
    LoginComponent
  ],
  providers: [LoginService],
})
export class LoginModule {
}
