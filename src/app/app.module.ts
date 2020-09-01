// app component
import { AppComponent } from './app.component';
// Module
import { SharedModule } from 'app/shared/index.shared';
import { AppRouterModule } from 'app/app.routes';
import { RegistrationModule } from 'app/registration/index.registration';
import { DeclarationFormModule } from 'app/declaration-form/index.declaration-form';
import { RequestListModule } from 'app/request-list/index.request-list';
import { ErrorModule } from 'app/error/index.error';
// import { TableModule } from 'app/responsive_table/index.responsive';
// import { NavigationDestinationModule } from 'app/navigation-destination/index.navigation';
import { ServiceModule } from 'app/shared/services/service.module';
import { LoginModule } from 'app/login/shared/login.module';
import { RequestModule } from 'app/request/shared/request.module';
import { MatIconModule, MatIcon } from '@angular/material/icon';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
// translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { UserDetailComponent } from './user-detail/user-detail.component';

// create loader for translation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [AppComponent, UserDetailComponent],
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
