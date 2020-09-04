import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserListService } from '../user.service';
import { EntityStatus } from 'app/app.enum';
import { ErrorService, SpinnerService } from 'app/shared/index.shared';

@Component({
    selector: 'evry-user-detail',
    templateUrl: './user-detail-dialog.component.html',
    styleUrls: ['./user-detail-dialog.component.scss'],
})
export class UserDetailDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<UserDetailDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private userService: UserListService,
        private errorService: ErrorService, private spinnerService: SpinnerService) {

    }

    ngOnInit() {
    }

    takeAction(value) {
        let status=0;
        if (value === 1) {
            status = EntityStatus.Accept;
        } else if (value === 0) {
            status = EntityStatus.Deny;
        }
       this.updateAccountStatus(this.data.user.id, status);  
    }

    updateAccountStatus(userId, status) {
        this.spinnerService.startRequest();
        this.userService.updateAccountStatus(userId, status).subscribe(data => {
            this.spinnerService.endRequest();
            if (data !== null && data.statusCode === 200) {
                this.dialogRef.close(true);
            } else {
                this.dialogRef.close(false);
                this.errorService.handleFailure(data.statusCode);
            }
        }, error => {
            this.spinnerService.endRequest();
            this.dialogRef.close(false);
            this.errorService.handleError(error);
        });
    }

}