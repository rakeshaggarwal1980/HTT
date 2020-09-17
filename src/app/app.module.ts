// app component
import { AppComponent } from './app.component';
// Module
import { SharedModule } from 'app/shared/index.shared';
import { AppRouterModule } from 'app/app.routes';
import { RegistrationModule } from 'app/registration/index.registration';
import { DeclarationFormModule } from 'app/declaration-form/index.declaration-form';
import { RequestListModule } from 'app/request-list/index.request-list';
import { UserListModule } from 'app/user-list/shared/user-list.module';
import { ErrorModule } from 'app/error/index.error';
import { ServiceModule } from 'app/shared/services/service.module';
import { LoginModule } from 'app/login/shared/login.module';
import { RequestModule } from 'app/request/shared/request.module';
import { ForgotPasswordModule } from 'app/forgot-password/shared/forgot-password.module';
import { ThankYouModule } from 'app/thank-you/shared/thank-you.module';
import { DeclarationListModule } from 'app/declaration-list/shared/declaration-list.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
// translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { UserAccountModule } from './user-account/shared/user-account.module';


// create loader for translation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatDialogModule,
    SharedModule,
    AppRouterModule,
    ErrorModule,
    RegistrationModule,
    DeclarationFormModule,
    LoginModule,
    RequestListModule,
    RequestModule,
    MatIconModule,
    MatMenuModule,
    UserListModule,
    DeclarationListModule,
    ForgotPasswordModule,
    ThankYouModule,
    UserAccountModule,
    // NavigationDestinationModule,
    // TableModule,
    ServiceModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    })
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
