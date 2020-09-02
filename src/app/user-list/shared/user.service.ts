import { Injectable } from '@angular/core';

import { ApiClientService } from 'app/shared/services/api-client.service';
import { of } from 'rxjs';

@Injectable()
export class UserListService {

  constructor(private apiClientService: ApiClientService) {
  }

  getUserDetail(userId){
    return this.apiClientService.Employee_EmployeebyId(userId);
  }

  updateAccountStatus(employeeId, status){
    return this.apiClientService.Employee_UpdateAccountStatus(employeeId, status);
  }
  getAllEmployees() {
    return this.apiClientService.Employee_Employees();
  }

}
