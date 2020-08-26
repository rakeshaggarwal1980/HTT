import { Injectable } from '@angular/core';

import { ApiClientService } from 'app/shared/services/api-client.service';
import { of } from 'rxjs';

@Injectable()
export class RequestListService {

    constructor(private apiClientService: ApiClientService) {
    }

    getRequests() {
        return this.apiClientService.Request_Requests();
    }

    updateRequest(request: any){
      return this.apiClientService.Request_PutRequest(request);
    }
}
