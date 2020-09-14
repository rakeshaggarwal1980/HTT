import { NgModule } from '@angular/core';

// services
import { UtilityService } from './utility.service';
import { ApiClientService } from 'app/shared/services/api-client.service';
import { ErrorService } from 'app/shared/services/error.service';
import { ExportService } from 'app/shared/services/export.service';
import { CommonService } from './common.service';


@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    ApiClientService,
    CommonService,
    UtilityService,
    ErrorService,
    ExportService
  ]
})

export class ServiceModule { }
