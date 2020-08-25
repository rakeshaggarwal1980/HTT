import { Injectable } from '@angular/core';

import { ApiClientService } from 'app/shared/services/api-client.service';
import { of } from 'rxjs';

@Injectable()
export class RequestListService {

    constructor(private apiClientService: ApiClientService) {
    }

    getRequests() {

        const req =
        {
            body: [{
                id: 1, requestNumber: "abc123", employeeCode: 108650, dateOfRequest: "2020-08-24T10:22:11.145Z",
                isApproved: true, isDeclined: false, employeeId: 5,
                employee: {
                    id: 5, name: "Shikha", email: "shikha@evry.com",
                    password: "123456", employeeCode: 108650
                }
            },
            {
                id: 2, requestNumber: "wert3455", employeeCode: 1086, dateOfRequest: "2020-08-24T10:22:11.145Z",
                isApproved: false, isDeclined: true, employeeId: 7,
                employee: {
                    id: 7, name: "Davinder", email: "Davinder@evry.com",
                    password: "123456", employeeCode: 1086
                }
            },

            ]
        };

        return of(req);

        // return this.apiClientService.Request_Requests();
    }

    updateRequest(request: any){
      return this.apiClientService.Request_PutRequest(request);
    }
}
