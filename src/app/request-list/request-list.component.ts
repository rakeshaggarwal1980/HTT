import { Component, OnInit, Inject } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ViewRequestDialogComponent } from './shared/view-request-dialog/view-request-dialog.component';
import { RequestListService } from 'app/request-list/shared/request-list.service';
import { Location } from '@angular/common';
import { ErrorService, SnackBarService, SpinnerService } from '../shared/index.shared';

@Component({
  selector: 'evry-request-list',
  templateUrl: 'request-list.component.html',
  styleUrls: ['./shared/request-list.component.scss'],
})
export class RequestListComponent implements OnInit {
  Requests: any[] = [];
  viewRequestDialogRef: MatDialogRef<ViewRequestDialogComponent> = null;
  userId: number = 0;

  constructor(public dialog: MatDialog, private requestListService: RequestListService,
    private location: Location, private spinnerService: SpinnerService, private errorService: ErrorService,
    private snackbarService: SnackBarService) {
  }

  ngOnInit() {
    if (this.location.path() === '/requests') {
      this.getAllRequests();
    } else {
      let user = JSON.parse(localStorage.getItem('user'));
      if (user !== null && user !== undefined && user !== '') {
        this.userId = user.userId;
      }
      this.getAllRequestsByUserId();
    }
  }

  getAllRequests() {
    this.spinnerService.startLoading();
    this.requestListService.getAllRequests().subscribe(
      data => {
        this.spinnerService.stopLoading();
        if (data !== null || data !== undefined) {
          if (data.body.length > 0) {
            this.Requests = data.body;
          }
        } else {
          this.errorService.handleFailure(data.statusCode);
        }
      },
      err => {
        this.spinnerService.stopLoading();
        this.errorService.handleError(err);
      }
    );
  }

  getAllRequestsByUserId() {
    if (this.userId !== 0 && this.userId !== null && this.userId !== undefined) {
      this.spinnerService.startLoading();
      this.requestListService.getRequestsByUserId(this.userId).subscribe(
        data => {
          this.spinnerService.stopLoading();
          if (data !== null || data !== undefined) {
            if (data.body.length > 0) {
              this.Requests = data.body;
            }
          } else {
            this.errorService.handleFailure(data.statusCode);
          }
        },
        err => {
          this.spinnerService.stopLoading();
          this.errorService.handleError(err);
        }
      );
    }
  }

  viewRequest(request) {
    this.dialog.closeAll();
    this.viewRequestDialogRef = this.dialog.open(ViewRequestDialogComponent, {
      width: '800px',
      height: '470px',
      disableClose: false,
      panelClass: 'success-box',
      data: { request: request }
    });
    this.viewRequestDialogRef.afterClosed().subscribe(result => {
      if (result) {
       this.snackbarService.showSuccess("Request has been updated successfully");
      }
      this.viewRequestDialogRef = null;
    });
  }



}
