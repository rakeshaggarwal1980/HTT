import { Injectable } from '@angular/core';

import { ApiClientService } from 'app/shared/services/api-client.service';
import { of } from 'rxjs';

@Injectable()
export class UserService {

  constructor(private apiClientService: ApiClientService) {
  }

  getUserDetail(userId) {
    return this.apiClientService.Employee_EmployeebyId(userId);
  }

  updateAccountStatus(employeeId, status) {
    return this.apiClientService.Employee_UpdateAccountStatus(employeeId, status);
  }
  getAllEmployees(searchSortModel: any) {
    return this.apiClientService.Employee_Employees(searchSortModel);
  }

  updateEmployee(employee) {
    return this.apiClientService.Employee_UpdateEmployee(employee);
  }

  deleteEmployee(employeeId) {
    return this.apiClientService.Employee_DeleteEmployee(employeeId);
  }

}
