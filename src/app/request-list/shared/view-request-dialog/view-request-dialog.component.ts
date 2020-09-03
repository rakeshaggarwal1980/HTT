import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestListService } from '../request-list.service';
import { UtilityService } from 'app/shared/services/utility.service';
import { isNullOrUndefined } from 'util';
import { HR_ACTIONS, EMPLOYEE_ACTIONS, SECURITY_ACTIONS } from 'app/app.enum';

@Component({
    selector: 'evry-view-request',
    templateUrl: 'view-request-dialog.component.html',
    styleUrls: ['view-request-dialog.component.scss']
})
export class ViewRequestDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<ViewRequestDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public requestListService: RequestListService, private utilityService: UtilityService) { }
    ngOnInit() {
        console.log(this.data);
    }



    isAuthenticated(Action: any): boolean {
        let user = JSON.parse(localStorage.getItem('user'));
        if (!isNullOrUndefined(user) && user !== '') {
            if (!isNullOrUndefined(user.role)) {
                if (user.role.id == 1) {
                    if (Object.values(HR_ACTIONS).includes(Action)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                if (user.role.id == 2) {
                    if (Object.values(SECURITY_ACTIONS).includes(Action)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                if (user.role.id == 3) {
                    if (Object.values(EMPLOYEE_ACTIONS).includes(Action)) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
            }
        }
    }

    takeAction(value, comments) {
        this.data.request.hrComments = comments;
        if (value === 1) {
            this.data.request.isApproved = true;
        } else if (value === 0) {
            this.data.request.isDeclined = true;
        }
        this.updateRequest(this.data.request);
    }

    updateRequest(request) {
        this.requestListService.updateRequest(request).subscribe(data => {
            if (data !== null && data.StatusCode === 200) {
                // request updated
                this.dialogRef.close(true);
            } else {
                // error occured
                this.dialogRef.close(false);
            }
        }, error => {
            this.dialogRef.close(false);
        });
    }
}