import { Injectable } from '@angular/core';

import { Registration } from 'app/registration/shared/registration.model';
import { ApiClientService } from 'app/shared/services/api-client.service';
import { EntityStatus } from 'app/app.enum';

@Injectable()
export class RegistrationService {

    constructor(private apiClientService: ApiClientService) {
    }

    createEmployee(registration: any) {
        const employeeModel = {
            id: 0,
            name: registration.name,
            email: registration.email,
            employeeCode: Number(registration.employeeCode),
            password: registration.password,
            status: EntityStatus.Active,
            currentResidentialAddress:registration.currentResidentialAddress,
            permanentResidentialAddress: registration.permanentResidentialAddress
        };
        return this.apiClientService.Employee_Employee(employeeModel);
    }
}
