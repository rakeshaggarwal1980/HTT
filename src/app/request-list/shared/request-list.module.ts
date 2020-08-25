import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

// components
import { RequestListComponent } from 'app/request-list/request-list.component';
import { ViewRequestDialogComponent } from './view-request-dialog/view-request-dialog.component';
// modules
import { RequestListRouterModule } from 'app/request-list/shared/request-list.route';
import { SharedModule } from 'app/shared/shared.module';

import { RequestListService } from 'app/request-list/shared/request-list.service';



@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    MatDialogModule,
    RequestListRouterModule
  ],   
  exports: [],
  declarations: [
    ViewRequestDialogComponent,
    RequestListComponent
    
  ],
  providers: [RequestListService],
  entryComponents:[ViewRequestDialogComponent]
})
export class RequestListModule {
}
