import { Component, OnInit } from '@angular/core';
import { SnackBarService, SpinnerService, ErrorService } from '../shared/index.shared';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './user.service';
import { SpinnerDirective } from '../shared/spinner/spinner.directive';
import { RESPONSE_STATUS_ENUM } from '../app.enum';

@Component({
    selector: 'evry-user-detail',
    templateUrl: './user-detail.component.html',
    styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {

    userId = 0;
    user: any = null;
    constructor(private snackBarService: SnackBarService, private userService: UserService,
        private activatedRoute: ActivatedRoute, private spinnerService: SpinnerService,
        private errorService: ErrorService) {

    }

    ngOnInit() {
        this.userId = this.activatedRoute.snapshot.params['id'];
    }

    getUserDetail() {
        this.spinnerService.startRequest();
        this.userService.getUserDetail(this.userId).subscribe(data => {
            this.spinnerService.endRequest();
            if (data.status === RESPONSE_STATUS_ENUM.SUCCESS) {
                this.user= data.body;
            } else {
                this.errorService.handleFailure(data.statusCode);
            }
        }, error => {
            this.spinnerService.endRequest();
            this.errorService.handleError(error);
        });
    }

}