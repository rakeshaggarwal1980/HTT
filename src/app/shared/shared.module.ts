// spinner
import { SpinnerDirective } from 'app/shared/spinner/spinner.directive';

// services
import { SpinnerService } from 'app/shared/spinner/spinner.service';
import { ValidatorService } from 'app/shared/utility/validation.service';
import { ExampleService } from 'app/shared/utility/example.service';
import { HttpInterceptorHandler } from './interceptor/HttpInterceptorHandler';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'app/shared/guards/auth.guard.service';
import { PagerComponent } from 'app/shared/pager/pager.component';
import { CheckPasswordDirective } from 'app/shared/utility/check-password.directive';


@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
  ],
  declarations: [
    SpinnerDirective,
    PagerComponent,
    CheckPasswordDirective
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
    SpinnerDirective,
    PagerComponent,
    CheckPasswordDirective
  ],
  providers: [
    SpinnerService,
    ExampleService,
    AuthGuardService,
    ValidatorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorHandler,
      multi: true,
    },
  ],
})

export class SharedModule {
}
