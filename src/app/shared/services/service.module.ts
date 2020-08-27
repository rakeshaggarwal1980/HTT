import { NgModule } from '@angular/core';

// services
import { UtilityService } from './utility.service';
import { ApiClientService } from 'app/shared/services/api-client.service';
import { ErrorService } from 'app/shared/services/error.service';



@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    ApiClientService,
    UtilityService,
    ErrorService
  ]
})

export class ServiceModule { }
