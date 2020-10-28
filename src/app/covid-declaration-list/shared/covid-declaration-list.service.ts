import { Injectable } from '@angular/core';

import { ApiClientService } from 'app/shared/services/api-client.service';
import { of } from 'rxjs';

@Injectable()
export class CovidDeclarationListService {

  constructor(private apiClientService: ApiClientService) {
  }

  getCovidDeclarations(searchSortModel: any) {
    return this.apiClientService.Health_CovidDeclarations(searchSortModel);
  }

 


}
