import { Component, OnInit, Inject } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserService } from 'app/user-list/shared/user.service';
import { SpinnerService, ErrorService, SnackBarService } from '../shared/index.shared';
import { RESPONSE_STATUS_ENUM } from '../app.enum';
import { UserDetailDialogComponent } from './shared/user-detail-dialog/user-detail-dialog.component';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'evry-user-list',
  templateUrl: 'user-list.component.html',
  styleUrls: ['./shared/user-list.component.scss'],
})
export class UserListComponent implements OnInit {

  employees$: BehaviorSubject<any[]> = new BehaviorSubject([]);
  userObj = null;
  viewUserDialogRef: MatDialogRef<UserDetailDialogComponent> = null;
  allRoles: any[] = [];
  constructor(public dialog: MatDialog, private userService: UserService, private router: Router,
    private spinnerService: SpinnerService, private errorService: ErrorService,
    private snackbarService: SnackBarService, private commonService: CommonService) {
  }

  ngOnInit() {
    this.getRoles();
    this.getAllEmployees();
  }

  getRoles() {
    this.spinnerService.startRequest();
    this.commonService.getRoles().subscribe(
      (data) => {
        this.spinnerService.endRequest();
        if (data !== null && data !== undefined) {
          if (data.body.length > 0) {
            this.allRoles = data.body;
          }
        } else {
          this.errorService.handleFailure(data.statusCode);
        }
      },
      (err) => {
        this.spinnerService.endRequest();
        this.errorService.handleError(err);
      }
    );


  }

  getAllEmployees() {
    this.spinnerService.startRequest();
    this.userService.getAllEmployees().subscribe(
      (data) => {
        this.spinnerService.endRequest();
        if (data !== null && data !== undefined) {
          if (data.body.length > 0) {
            this.employees$.next(data.body);
          }
        } else {
          this.errorService.handleFailure(data.statusCode);
        }
      },
      (err) => {
        this.spinnerService.endRequest();
        this.errorService.handleError(err);
      }
    );
  }

  viewUser(userObj) {
    this.dialog.closeAll();
    this.viewUserDialogRef = this.dialog.open(UserDetailDialogComponent, {
      width: '800px',
      height: '518px',
      disableClose: false,
      panelClass: 'success-box',
      data: { user: userObj, allRoles: this.allRoles }
    });
    this.viewUserDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllEmployees();
        this.snackbarService.showSuccess("User account has been updated successfully");
      }
      this.viewUserDialogRef = null;
    });
  }

  deleteEmployee(employeeId) {
    this.spinnerService.startRequest();
    this.userService.deleteEmployee(employeeId).subscribe((data) => {
      this.spinnerService.endRequest();
      if (data !== null && data !== undefined) {
        if (data.status === RESPONSE_STATUS_ENUM.SUCCESS) {
          this.snackbarService.showSuccess('Employee deleted successfully.');
          this.getAllEmployees();
        }
      } else {
        this.errorService.handleFailure(data.statusCode);
      }
    },
      (err) => {
        this.spinnerService.endRequest();
        this.errorService.handleError(err);
      }
    );
  }

}
