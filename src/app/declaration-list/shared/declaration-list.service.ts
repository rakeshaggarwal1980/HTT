import { Injectable } from '@angular/core';

import { ApiClientService } from 'app/shared/services/api-client.service';
import { of } from 'rxjs';

@Injectable()
export class DeclarationListService {

  constructor(private apiClientService: ApiClientService) {
  }

  getDeclarations(searchSortModel: any) {
    return this.apiClientService.Health_Declarations(searchSortModel);
  }

  getDeclarationToExport() {
    return this.apiClientService.Health_GetDeclarationsToExport();
  }
}
