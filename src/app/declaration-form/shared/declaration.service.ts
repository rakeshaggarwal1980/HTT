import { Injectable } from 'vendor/angular';
import { ApiClientService } from 'app/shared/services/api-client.service';
import { EntityStatus } from 'app/app.enum';
import { Observable } from 'rxjs';
import { TypeScriptEmitter } from '@angular/compiler';

@Injectable()
export class DeclarationService {

    constructor(private apiClientService: ApiClientService) {
    }



    getDeclarationData() {
        return this.apiClientService.Health_DeclarationData();
    }

    PostDeclarationData(declarationData: any) {
        console.log(declarationData);
        return this.apiClientService.Health_PostDeclarationData(declarationData);
    }

    getEmployeeSelfDeclaration(employeeId: number, requestNumber: string) {
        return this.apiClientService.Health_GetEmployeeSelfDeclaration(employeeId, requestNumber);
    }
}


