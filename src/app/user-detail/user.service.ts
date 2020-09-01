import { Injectable } from '@angular/core';
import { ApiClientService } from 'app/shared/services/api-client.service';

@Injectable({
    providedIn: 'root',
})
export class UserService {

    constructor(private apiClientService: ApiClientService) {
    }

    getUserDetail(userId){
        return this.apiClientService.Employee_EmployeebyId(userId);
    }
}