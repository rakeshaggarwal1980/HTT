import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestListService } from '../request-list.service';

@Component({
    selector: 'evry-view-request',
    templateUrl: 'view-request-dialog.component.html',
    styleUrls: ['view-request-dialog.component.scss']
})
export class ViewRequestDialogComponent implements OnInit {
    constructor(public dialogRef: MatDialogRef<ViewRequestDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public requestListService: RequestListService) { }
    ngOnInit() {

    }

    takeAction(value) {
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