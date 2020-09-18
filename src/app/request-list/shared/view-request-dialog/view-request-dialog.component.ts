import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RequestListService } from '../request-list.service';
import { UtilityService } from 'app/shared/services/utility.service';
import { isNullOrUndefined } from 'util';
import { HR_ACTIONS, EMPLOYEE_ACTIONS, SECURITY_ACTIONS } from 'app/app.enum';
import { ErrorService } from 'app/shared/index.shared';
import { SpinnerService } from 'app/shared/spinner/shared/spinner.service';
import { Location } from '@angular/common';
@Component({
  selector: 'evry-view-request',
  templateUrl: 'view-request-dialog.component.html',
  styleUrls: ['view-request-dialog.component.scss']
})
export class ViewRequestDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ViewRequestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public requestListService: RequestListService, private utilityService: UtilityService, public spinnerService: SpinnerService,
    public errorService: ErrorService, private location: Location) { }
  ngOnInit() {
  }

  isAuthenticated(Action: any): boolean {
    let user = JSON.parse(localStorage.getItem('user'));
    let isPermitted: boolean = false;
    if (!isNullOrUndefined(user) && user !== '') {
      if (!isNullOrUndefined(user.roles)) {
        user.roles.forEach(role => {
          switch (role.roleId) {
            case 1:
              if (Object.values(HR_ACTIONS).includes(Action)) {
                isPermitted = true;
              }
              break;
            case 2:
              if (Object.values(SECURITY_ACTIONS).includes(Action)) {
                isPermitted = true;
              }
              break;
            case 3:
              if (Object.values(EMPLOYEE_ACTIONS).includes(Action)) {
                isPermitted = true;
              }
              break;
            default:
              isPermitted = false;
          }
        });
        return isPermitted;
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
    this.spinnerService.startLoading();
    this.requestListService.updateRequest(request).subscribe(data => {
      this.spinnerService.stopLoading();
      if (data !== null && data.statusCode === 200) {
        this.dialogRef.close(true);
      } else {
        this.dialogRef.close(false);
        this.errorService.handleFailure(data.statusCode);
      }
    }, error => {
      this.spinnerService.stopLoading();
      this.dialogRef.close(false);
      this.errorService.handleError(error);
    });
  }
}
