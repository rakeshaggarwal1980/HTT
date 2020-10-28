import { Injectable } from 'vendor/angular';
import { ApiClientService } from 'app/shared/services/api-client.service';
import { EntityStatus } from 'app/app.enum';
import { Observable } from 'rxjs';
import { TypeScriptEmitter } from '@angular/compiler';

@Injectable()
export class CovidFormService {

    constructor(private apiClientService: ApiClientService) {
    }


    getCovidDeclaration(declarationId: number) {
        return this.apiClientService.Health_GetEmployeeCovidDeclaration(declarationId);
    }

    getDeclarationData() {
        return this.apiClientService.Health_DeclarationData();
    }

    PostCovidDeclarationData(declarationData: any) {
        console.log(declarationData);
        return this.apiClientService.Health_PostCovidDeclarationData(declarationData);
    }

    getEmployeeSelfDeclaration(employeeId: number, requestNumber: string) {
        return this.apiClientService.Health_GetEmployeeSelfDeclaration(employeeId, requestNumber);
    }
}


