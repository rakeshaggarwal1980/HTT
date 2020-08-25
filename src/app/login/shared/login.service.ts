import { Injectable } from '@angular/core';
import { ApiClientService } from 'app/shared/services/api-client.service';

@Injectable()
export class LoginService {

    constructor(private apiClientService: ApiClientService) {
    }

    login(loginDetails: any) {
        return this.apiClientService.Login_Login(loginDetails);
    }

}
