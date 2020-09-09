import { TranslateModule } from '@ngx-translate/core';
// components
import { ThankYouComponent } from 'app/thank-you/thank-you.component';

// modules
import { ThankYouRouterModule } from 'app/thank-you/shared/thank-you.route';
import { SharedModule } from 'app/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    MatFormFieldModule,
    MatInputModule,
    ThankYouRouterModule

  ],
  exports: [MatInputModule, MatFormFieldModule],
  declarations: [
    ThankYouComponent
  ],
  providers: [],
})
export class ThankYouModule {
}
