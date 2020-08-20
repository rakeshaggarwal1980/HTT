import { NgModule } from 'vendor/angular';

// services
import { UtilityService } from './utility.service';
import { ApiClientService } from 'app/shared/services/api-client.service';
// import { CommonService } from 'app/shared/services/common.service';
import { ErrorService } from 'app/shared/services/error.service';



@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    ApiClientService,
    UtilityService,
    //CommonService,
    ErrorService
  ]
})

export class ServiceModule { }
