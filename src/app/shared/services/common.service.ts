import { Injectable } from 'vendor/angular';
import { ApiClientService } from './api-client.service';


@Injectable()
export class CommonService {
  constructor(private apiClientService: ApiClientService) {

  }

  getRoles() {
    return this.apiClientService.Role_Roles();
  }
}
