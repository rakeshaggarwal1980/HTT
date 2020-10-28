import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';

// components
import { MatCardModule } from '@angular/material/card';
import { RequestListComponent } from 'app/request-list/request-list.component';
import { ViewRequestDialogComponent } from './view-request-dialog/view-request-dialog.component';
// modules
import { RequestListRouterModule } from 'app/request-list/shared/request-list.route';
import { SharedModule } from 'app/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { RequestListService } from 'app/request-list/shared/request-list.service';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  imports: [
    TranslateModule,
    SharedModule,
    MatDialogModule,
    RequestListRouterModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatCardModule,
    MatIconModule
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
