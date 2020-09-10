import { Injectable } from 'vendor/angular';
import { ApiClientService } from 'app/shared/services/api-client.service';
import { EntityStatus } from 'app/app.enum';
import { Observable } from 'rxjs';

@Injectable()
export class ForgotPasswordService {

    constructor(private apiClientService: ApiClientService) {
    }

    forgotPassword(email: string) {
    debugger;
        const accountViewModel = {
            email: email.toString()
        }

        console.log('final forgot password model');
        console.log(accountViewModel);

        return this.apiClientService.Account_ForgotPassword(accountViewModel);
    }
}


