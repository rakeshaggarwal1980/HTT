import { TranslateModule } from '@ngx-translate/core';
// components
import { CovidFormComponent } from 'app/covid-form/covid-form.component';

// modules
import { CovidFormRouterModule } from 'app/covid-form/shared/covid-form.route';
import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    CovidFormRouterModule,
  ],
  exports: [],
  declarations: [
    CovidFormComponent
  ],
  providers: [],
})
export class CovidFormModule {
}
