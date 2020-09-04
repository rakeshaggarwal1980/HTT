import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestListService } from '../request-list.service';
import { SpinnerService, ErrorService } from 'app/shared/index.shared';

@Component({
    selector: 'evry-view-request',
    templateUrl: 'view-request-dialog.component.html',
    styleUrls: ['view-request-dialog.component.scss']
})
export class ViewRequestDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<ViewRequestDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public requestListService: RequestListService, public spinnerService: SpinnerService,
        public errorService: ErrorService) { }

    ngOnInit() {
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
        this.spinnerService.startRequest();
        this.requestListService.updateRequest(request).subscribe(data => {
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