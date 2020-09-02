import { Component, OnInit, Inject } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserListService } from 'app/user-list/shared/user.service';
import { SpinnerService, ErrorService, SnackBarService } from '../shared/index.shared';
import { RESPONSE_STATUS_ENUM } from '../app.enum';
import { UserDetailDialogComponent } from './shared/user-detail-dialog/user-detail-dialog.component';

@Component({
  selector: 'evry-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['./shared/user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  Requests: any[] = [];

  userObj = null;
  viewUserDialogRef: MatDialogRef<UserDetailDialogComponent> = null;
  constructor(public dialog: MatDialog, private userListService: UserListService, private router: Router,
    private spinnerService: SpinnerService, private errorService: ErrorService, private snackbarService: SnackBarService) {
  }

  ngOnInit() {

    //this.getAllRequests();


    const body = document.getElementsByTagName('body')[0];
    body.classList.remove('login-bg');


    // remove this function when list binding is done
    this.getUserDetail();
  }

  // getAllRequests() {
  //   let user = JSON.parse(localStorage.getItem('user'));
  //   if (!isNullOrUndefined(user) && user !== '') {
  //     this.requestListService.getRequestsByUserId(user.userId).subscribe(
  //       data => {
  //         if (!isNullOrUndefined(data)) {
  //           if (data.body.length > 0) {
  //             this.Requests = data.body;
  //             console.log('these are requests');
  //             console.log(this.Requests);

  //           }
  //         } else {
  //         }
  //       },
  //       err => {
  //         //// this.isGetting = false;
  //         if (err.status === 401) {
  //           console.log('error');
  //         }
  //       }
  //     );
  //   }

  // }

   getUserDetail() {
        this.spinnerService.startRequest();
        this.userListService.getUserDetail(1014).subscribe(data => {
            this.spinnerService.endRequest();
            if (data.status === RESPONSE_STATUS_ENUM.SUCCESS) {
                this.userObj= data.body;
            } else {
                this.errorService.handleFailure(data.statusCode);
            }
        }, error => {
            this.spinnerService.endRequest();
            this.errorService.handleError(error);
        });
    }

    // call this method on table row view icon click
    viewUser(userObj){
      this.dialog.closeAll();
      this.viewUserDialogRef = this.dialog.open(UserDetailDialogComponent, {
        width: '800px',
        height: '518px',
        disableClose: false,
        panelClass: 'success-box',
        data: { user: userObj }
      });
      this.viewUserDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.snackbarService.showSuccess("User account has been updated successfully");
        }
        this.viewUserDialogRef = null;
      });
    }


}
