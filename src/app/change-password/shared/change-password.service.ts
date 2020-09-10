import { Injectable } from 'vendor/angular';
import { ApiClientService } from 'app/shared/services/api-client.service';
import { EntityStatus } from 'app/app.enum';
import { Observable } from 'rxjs';

@Injectable()
export class ChangePasswordService {

    constructor(private apiClientService: ApiClientService) {
    }

    changePassword(model: any) {
        console.log('final reset password request');
        console.log(model);

        return this.apiClientService.Account_ResetPassword(model);
    }
}


