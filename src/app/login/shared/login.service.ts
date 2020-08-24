import { Injectable } from 'vendor/angular';
import { ApiClientService } from 'app/shared/services/api-client.service';
import { EntityStatus } from 'app/app.enum';

@Injectable()
export class LoginService {

    constructor(private apiClientService: ApiClientService) {
    }

    login(loginDetails: any) {
        return this.apiClientService.Login_Login(loginDetails);
    }

}
