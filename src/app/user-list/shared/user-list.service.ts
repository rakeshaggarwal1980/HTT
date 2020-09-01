import { Injectable } from '@angular/core';

import { ApiClientService } from 'app/shared/services/api-client.service';
import { of } from 'rxjs';

@Injectable()
export class UserListService {

  constructor(private apiClientService: ApiClientService) {
  }

  // getRequests() {
  //   return this.apiClientService.Request_Requests();
  // }

  // getRequestsByUserId(userId: number) {
  //   return this.apiClientService.Request_RequestsByUserId(userId);
  // }

  // updateRequest(request: any) {
  //   return this.apiClientService.Request_PutRequest(request);
  // }
}
