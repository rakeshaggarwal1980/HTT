import { Injectable } from 'vendor/angular';
import { ApiClientService } from 'app/shared/services/api-client.service';

@Injectable()
export class UserAccountService {

  constructor(private apiClientService: ApiClientService) {
  }

  changePassword(model: any) {
    return this.apiClientService.Account_ResetPassword(model);
  }

  updateEmployee(employee) {
    return this.apiClientService.Employee_UpdateEmployee(employee);
  }
}


