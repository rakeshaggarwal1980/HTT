import { TranslateModule } from '@ngx-translate/core';
// components
import { RequestListComponent } from 'app/request-list/request-list.component';

// modules
import { RequestListRouterModule } from 'app/request-list/shared/request-list.route';
import { SharedModule } from 'app/shared/shared.module';
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    RequestListRouterModule,
  ],
  exports: [],
  declarations: [
    RequestListComponent
  ],
  providers: [],
})
export class RequestListModule {
}
