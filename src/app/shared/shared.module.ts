
import { ValidatorService } from 'app/shared/utility/validation.service';
import { HttpInterceptorHandler } from './interceptor/HttpInterceptorHandler';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from 'app/shared/guards/auth.guard.service';
import { PagerComponent } from 'app/shared/pager/pager.component';
import { CheckPasswordDirective } from 'app/shared/utility/check-password.directive';
import { SpinnerComponent } from 'app/shared/spinner/spinner.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    PagerComponent,
    CheckPasswordDirective,
    SpinnerComponent
  ],
  exports: [
    HttpClientModule,
    CommonModule,
    RouterModule,
    PagerComponent,
    CheckPasswordDirective,
    SpinnerComponent
  ],
  providers: [
    AuthGuardService,
    ValidatorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorHandler,
      multi: true,
    },
  ]
})

export class SharedModule {
}
