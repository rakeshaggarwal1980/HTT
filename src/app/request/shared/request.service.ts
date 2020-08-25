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
            dateOfRequest: request.dateOfRequest,
            isApproved: false,
            isDeclined: false,
            employeeId: Number(request.employeeId),
            employee: {
                id: Number(request.employee.id),
                name: request.employee.name,
                email: request.employee.email,
                password: request.employee.password,
                employeeCode: Number(request.employee.employeeCode)
            }
        }

        console.log('final request');
        console.log(requestModel);

        return this.apiClientService.Request_CreateRequest(requestModel);
    }
}


