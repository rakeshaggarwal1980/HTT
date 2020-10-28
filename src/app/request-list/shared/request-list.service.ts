import { Injectable } from '@angular/core';

import { ApiClientService } from 'app/shared/services/api-client.service';
import { of } from 'rxjs';

@Injectable()
export class RequestListService {

  constructor(private apiClientService: ApiClientService) {
  }

  getRequestsByUserId(searchSortModel: any) {
    return this.apiClientService.Request_RequestsByUserId(searchSortModel);
  }

  getAllRequests(searchSortModel: any) {
    return this.apiClientService.Request_Requests(searchSortModel);
  }

  updateRequest(request: any) {
    return this.apiClientService.Request_PutRequest(request);
  }
}
