import { Injectable } from 'vendor/angular';
import { ApiClientService } from 'app/shared/services/api-client.service';
import { EntityStatus } from 'app/app.enum';
import { Observable } from 'rxjs';

@Injectable()
export class RequestService {

    constructor(private apiClientService: ApiClientService) {
    }

    createRequest(request: any) {
        const requestModel = {
            id: 0,
            requestNumber: request.requestNumber,
            employeeCode: Number(request.employeeCode),
            fromDate: request.fromDate,
            toDate: request.toDate,
            isApproved: false,
            isDeclined: false,
            employeeId: Number(request.employeeId),
            hrComments: ''
        }

        console.log('final request');
        console.log(requestModel);

        return this.apiClientService.Request_CreateRequest(requestModel);
    }
}


