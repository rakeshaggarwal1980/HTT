import { Injectable } from 'vendor/angular';

import { ApiClientService } from 'app/shared/services/api-client.service';
import { EntityStatus } from 'app/app.enum';

@Injectable()
export class RequestListService {

    constructor(private apiClientService: ApiClientService) {
    }

    getRequests() {

        return this.apiClientService.Request_Requests();
    }

}
